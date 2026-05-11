# GET /item_summary/search

Search for items by keyword or category

This method searches for eBay items by various query parameters and retrieves summaries.

## Parameters

- **aspect_filter** (string) — Filter by item aspects (color, brand, etc).
- **auto_correct** (string) — Enable auto correction. Valid Value: KEYWORD.
- **category_ids** (string) — Primary item category IDs.
- **charity_ids** (string) — Limit results to specified charities.
- **compatibility_filter** (string) — Attributes to define a specific product for compatibility.
- **epid** (string) — eBay product identifier.
- **fieldgroups** (string) — Control what is returned (e.g., ASPECT_REFINEMENTS).
- **filter** (string) — Field filters like price, condition, etc.
- **gtin** (string) — Global Trade Item Number/UPC.
- **limit** (string) — Number of items per page. Max 200.
- **offset** (string) — Number of items to skip. Max 10,000.
- **q** (string) — Search keywords.
- **sort** (string) — Sort order field name.

## Request Body

```
null
```

## Response Example

```
{ "itemSummaries": [], "total": 0, "limit": 50, "offset": 0 }
```

Tags: item_summary
