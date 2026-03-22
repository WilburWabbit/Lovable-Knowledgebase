# QBO Integration Debugging: Lessons Learned

**Repo:** `WilburWabbit/Lovable-kusooishii`
**Branch:** `claude/debug-qbo-integration-KBnxh`
**Date:** March 2026
**Context:** QuickBooks Online integration for Kuso Oishii e-commerce (LEGO collectibles), built on Supabase Edge Functions with a React frontend.

---

## Executive Summary

The debug branch (`claude/debug-qbo-integration-KBnxh`) attempted to fix QBO sync issues by adding incremental patches to a monolithic architecture where each edge function (webhook, sync-sales, sync-purchases) handled the full pipeline from fetching QBO data to writing canonical database records. After merging 3 PRs (#17, #18, #19) from the branch, main required **~70 additional commits** of further fixes before stability was achieved.

The root cause was architectural: the branch kept patching a fundamentally flawed "fetch-and-process-inline" design. Main ultimately succeeded by introducing a **land-only + centralized processor** architecture that separated concerns cleanly. The branch's 1,485-line webhook shrank to 381 lines on main, while a new dedicated `qbo-process-pending` function (1,095 lines) handled all processing in dependency order.

---

## 1. What the Branch Tried (and Why It Didn't Work)

### 1.1 Monolithic Inline Processing

**The branch approach:** Each edge function (webhook, sync-sales, sync-purchases) fetched data from QBO AND processed it into canonical tables (products, SKUs, stock_units, sales_orders, etc.) within the same execution context.

**Evidence:** The branch's `qbo-webhook/index.ts` was 1,485 lines and contained complete business logic for handling purchases (creating receipts, receipt lines, stock units, resolving tax codes, auto-processing), sales (creating orders, cross-channel dedup, stock allocation), items (SKU creation, BrickEconomy enrichment, AI copy generation), and customers — all inline.

**Why it failed:**

- **Race conditions.** When a QBO webhook fires, it often sends multiple entity change notifications simultaneously. The branch processed each entity inline within the webhook handler, meaning a Purchase and its referenced Items could be processed in arbitrary order. If the Purchase arrived first, item lookups would fail silently.
- **No dependency ordering.** QBO data has dependencies: Items must exist before Purchases can reference them as SKUs, and Purchases must create stock before Sales can allocate it. The branch had no way to enforce this ordering because each function processed whatever it received immediately.
- **Timeout risk.** Supabase Edge Functions have execution time limits. The branch's webhook handler was doing QBO API calls, database writes, BrickEconomy API enrichment, and OpenAI-powered copy generation all in one invocation. Long-running operations risked timeout before completing, leaving data in partial states.
- **Duplicated logic.** The same processing logic (SKU resolution, stock creation, tax code mapping) was copy-pasted across `qbo-webhook`, `qbo-sync-sales`, and `qbo-sync-purchases`. Bug fixes in one location weren't always propagated to others.

### 1.2 Incremental Stock Reconciliation Bolted On

The branch added stock reconciliation phases directly into the sales sync flow — running reconciliation on every sync invocation. This created cascading issues:

- Reconciliation ran before all purchases had been processed, meaning it "fixed" discrepancies that would have self-resolved once pending purchases landed.
- The branch added ~13 commits specifically trying to get stock reconciliation right (`Add stock reconciliation phase`, `Fix stock reconciliation: close sold stock`, `Fix stock reconciliation for cross-channel dedup`, etc.), each fixing edge cases from the previous attempt.

### 1.3 Edge Function Invocation Workarounds

The branch spent 4 commits trying to work around Edge Function reachability:

1. `Replace supabase.functions.invoke with raw fetch` — trying to get actionable errors
2. `Replace Supabase client with raw fetch for Edge Function calls` — different approach, same problem
3. `Add server-side proxy fallback for unreachable Edge Functions` — server-side workaround
4. `Add server-side proxy for unreachable Edge Functions` — another iteration

These were symptoms of the inline processing model: because the webhook did everything itself, failures in sub-calls were opaque and hard to diagnose.

### 1.4 Defensive Migrations Without Root Cause Fix

The final branch commits (`Add graceful fallback for missing QBO tracking columns`, `Add defensive migration for missing sales_order QBO tracking columns`) added database-level fallbacks for missing columns rather than addressing why the columns were missing. This is a classic "treating symptoms not disease" pattern.

---

## 2. What Main Did Differently (and Why It Worked)

### 2.1 Land-Only Architecture (Separation of Concerns)

**The main approach:** Split the pipeline into two distinct phases:

1. **Land phase** — Fetch data from QBO and write raw payloads into staging tables (`landing_raw_qbo_*`) with status "pending". No canonical table writes.
2. **Process phase** — A single centralized function (`qbo-process-pending`) reads pending staged records and writes to canonical tables in strict dependency order.

**File size evidence:**

| Function | Branch (lines) | Main (lines) | Change |
|---|---|---|---|
| qbo-webhook | 1,485 | 381 | -74% |
| qbo-sync-sales | 1,051 | 281 | -73% |
| qbo-sync-purchases | 841 | 253 | -70% |
| qbo-sync-items | 439 | 212 | -52% |
| qbo-process-pending | 0 (didn't exist) | 1,095 | NEW |

The total line count dropped from ~3,816 across 4 files to ~2,222 across 5 files (42% reduction), while gaining strict ordering guarantees and eliminating duplication.

### 2.2 Tiered Dependency Processing

The centralized processor enforces a strict processing order:

```
Tier 1: Customers + Items → SKUs (no inter-dependencies)
Tier 2: Purchases → Receipts → Receipt Lines → Stock Units (depends on Tier 1)
Tier 3: Sales Receipts + Refunds → Orders → Order Lines → Stock Allocation (depends on Tier 2)
```

Crucially, the processor checks pending counts for each tier and **only advances to the next tier when the previous is fully drained**. This eliminates the race conditions that plagued the branch.

### 2.3 Iterative Drain Loop

Both the webhook and the sync functions call `drainPendingQbo()` after landing data:

```typescript
for (let i = 0; i < 25; i++) {
  const res = await fetchWithTimeout(`${supabaseUrl}/functions/v1/qbo-process-pending`, {
    method: "POST",
    headers: { Authorization: `Bearer ${serviceRoleKey}`, ... },
    body: JSON.stringify({ batch_size: 50 }),
  }, 60_000);
  const data = await res.json();
  if (!data?.has_more) break;
}
```

This pattern processes in batches and respects the tiered ordering across multiple iterations. If the function times out, pending records remain staged and will be processed on the next invocation — no data loss.

### 2.4 Premature QtyOnHand Sync Removed

A critical bug found on main (commit `1ae44fc`) revealed that `processItems()` was running QtyOnHand reconciliation during Tier 1 processing — before purchases and sales had been processed. After a rebuild (when the app has 0 stock), this backfilled all QBO inventory at $0 cost, then `processPurchases` created additional units from receipts, doubling stock counts and creating permanent discrepancies.

The fix: QtyOnHand reconciliation was moved exclusively to the dedicated `reconcile-stock` admin action, which runs only after all processing tiers complete. The branch never identified this timing issue because its inline processing model made the ordering invisible.

### 2.5 Dedicated Reconciliation as Admin Action

Instead of running reconciliation on every sync (branch approach), main moved it to a separate admin action (`reconcile-stock` in `admin-data/index.ts`) that:

- Runs only when explicitly triggered by an admin
- Auto write-offs excess stock (app > QBO) using FIFO ordering
- Auto backfills shortfall stock (QBO > app) with $0 cost balancing units
- Creates full audit trails for every adjustment
- Scopes audit queries with a 90-day time bound and 5,000 record limit to prevent unbounded scanning

### 2.6 Rebuild-from-QBO as Nuclear Reset

Main added a `rebuild-from-qbo` admin action that performs a clean nuclear reset: deletes all canonical QBO data, resets all landing tables to "pending", then triggers `qbo-process-pending` to replay from staged data. This provides a reliable recovery path when data gets into an inconsistent state, instead of the branch's approach of trying to patch inconsistencies one-by-one.

---

## 3. General Principles and Patterns

### 3.1 Staging Tables + Centralized Processing > Inline Processing

**Pattern:** When integrating with external APIs that send events asynchronously, always land raw data into staging tables first, then process staged data in a separate step with explicit ordering.

**Why:** External events arrive in unpredictable order. Staging tables decouple receipt timing from processing order. If processing fails, the raw data is preserved and can be retried without re-fetching from the external API.

**Anti-pattern:** Processing external data inline in the handler that receives it. This couples arrival order to processing order and makes partial failures unrecoverable.

### 3.2 Enforce Dependency Order Explicitly

**Pattern:** When data has dependencies (Items → SKUs → Stock → Orders), process each tier completely before advancing to the next. Check pending counts at each tier boundary.

**Why:** Without explicit ordering, race conditions are invisible during development (where you process one record at a time) but appear immediately in production (where multiple records arrive simultaneously).

**Anti-pattern:** Processing all entity types in the same loop/batch with no ordering guarantees. "It works when I test it" doesn't mean the ordering is correct.

### 3.3 Single Source of Truth for Business Logic

**Pattern:** Business logic (SKU resolution, stock allocation, tax code mapping) should live in exactly one function. Other entry points (webhooks, manual sync, admin actions) should land data and delegate to this function.

**Why:** When the same logic exists in 3+ places, bug fixes become a maintenance nightmare. The branch had SKU parsing logic duplicated in `qbo-webhook`, `qbo-sync-sales`, and `qbo-sync-purchases`, and they gradually diverged.

### 3.4 Reconciliation is a Separate Concern

**Pattern:** Don't mix reconciliation with data ingestion. Reconciliation should run after all ingestion is complete, as a distinct administrative action with full audit trails.

**Why:** Running reconciliation mid-ingestion "fixes" discrepancies that are temporary and would self-resolve once all data is processed. This creates phantom adjustments that compound into real discrepancies.

### 3.5 Fail Safe with Preserved Data

**Pattern:** If processing fails, the raw staged data should remain in a retryable state. Processing should be idempotent — running it again on the same staged data should produce the same result.

**Why:** External API data may be ephemeral or expensive to re-fetch. Once you've landed it, you have a permanent record. The branch's inline processing meant a mid-process failure could leave canonical tables in a half-updated state with no way to retry cleanly.

### 3.6 Don't Fix Symptoms — Fix Architecture

**Pattern:** If you find yourself making 5+ incremental fixes to the same subsystem, step back and evaluate whether the architecture is sound. A succession of "Fix X edge case" commits is a strong signal.

**Evidence:** The branch had 13 stock-reconciliation-related commits, 4 edge-function-invocation workaround commits, and 7+ commits trying to get SKU/stock creation right. Each fixed a real bug but didn't address the structural issue enabling those bugs.

### 3.7 Keep Edge Functions Focused

**Pattern:** Supabase Edge Functions (and serverless functions generally) should do one thing. A webhook handler should validate, land data, and return 200. Processing should happen elsewhere.

**Why:** Serverless functions have time limits, memory limits, and cold-start overhead. Cramming 1,485 lines of business logic into a webhook handler creates fragile, hard-to-debug, timeout-prone code.

---

## 4. Specific Technical Lessons

### 4.1 QBO Webhook Handling

- **Always return 200 immediately.** Intuit requires fast acknowledgement. Land the data and process async.
- **Validate HMAC-SHA256 signature** before any processing — the main branch kept this correctly in both approaches.
- **Land referenced entities proactively.** When landing a Purchase, also fetch and land the Items referenced in its line items. This ensures Tier 1 (Items) has data ready before Tier 2 (Purchases) needs it.

### 4.2 Cross-Channel Deduplication

- **Match by DocNumber first** for round-trip confirmation (web/eBay orders synced to QBO, then webhook fires back).
- **Check origin_channel + origin_reference** for same-channel dedup.
- **Main's approach:** Both dedup checks happen in `qbo-process-pending` where the order of checks is guaranteed. The branch scattered this logic across webhook and sync handlers.

### 4.3 Stock Allocation

- **Use database-level atomic operations** (RPC `allocate_stock_units`) for stock allocation. Both branch and main did this correctly.
- **Never run QtyOnHand reconciliation before all purchases and sales are processed** (the Tier 1 bug on main, commit `1ae44fc`).
- **Write-offs and backfills** belong in a dedicated reconciliation step, not inline during sync.

### 4.4 Error Handling in Staged Processing

- Main marks failed records as `status: "error"` with an `error_message`, preserving them for diagnosis without blocking the rest of the batch.
- Main cleans up partial state (e.g., `cleanupSalesOrder` deletes lines and reopens allocated stock) when a sales receipt fails mid-processing. The branch attempted this but inconsistently.

---

## 5. Migration Checklist (For Future Integration Work)

When building a new external API integration on this codebase:

1. Create staging/landing tables (`landing_raw_<source>_<entity>`) with columns: `id`, `external_id`, `raw_payload` (JSONB), `status` (pending/committed/error/skipped), `correlation_id`, `received_at`, `processed_at`, `error_message`.
2. Write a "land-only" edge function per data source that fetches from the API and inserts into staging tables. No canonical writes.
3. Write a single "process-pending" function that reads staged data and writes to canonical tables in dependency order. Use tiered processing with pending-count checks between tiers.
4. Wire the landing function to call the process function via `drainPending()` loop after landing.
5. Add a "rebuild" admin action that resets all staging records to "pending" and re-triggers processing.
6. Add a "reconcile" admin action that runs AFTER all processing, comparing canonical data against the external source and making audited adjustments.
7. Never duplicate business logic across functions. If the webhook and manual sync both need to process data, they should both land data and delegate to the same processor.
