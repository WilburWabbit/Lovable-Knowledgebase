

## Problem

Three parent-level eBay records exist because the import code extracts the system name from the subdomain (`api` vs `apiz`), causing `ilike("name", systemName)` to miss records whose `name` doesn't exactly match "Ebay" (e.g. "eBay Finances API", "Identity API").

The fix is two-fold: **consolidate existing data** and **fix the detection logic**.

---

## Plan

### 1. Database migration — consolidate duplicates

- Set `parent_id` on "eBay Finances API" and "Identity API" records to point to the existing "eBay" parent (`84b9a32d-...`).

### 2. Fix parent detection in `ImportSpecButton.tsx` (lines 53-80)

Current logic uses `parts[parts.length - 2]` which gets the second-level domain correctly, but the `ilike` match uses the capitalized domain name while existing records may have different casing or full names.

**Change**: Extract the **registered domain** (last 2 parts: `ebay.com`) regardless of subdomain. Then query for existing parents using `ilike` on `base_url` matching `%ebay.com%` (the domain) instead of matching by `name`. This way `api.ebay.com` and `apiz.ebay.com` both resolve to the same parent.

Specifically:
- Extract domain as `parts.slice(-2).join(".")` → `"ebay.com"`
- Query: `.is("parent_id", null)` and filter where `base_url` ilike `%ebay.com%`
- This ensures any subdomain variation resolves to the single parent

