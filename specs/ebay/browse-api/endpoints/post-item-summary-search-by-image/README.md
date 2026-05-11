# POST /item_summary/search_by_image

Search for items by image

Experimental: Searches for eBay items based on a Base64 image.

## Parameters

- **aspect_filter** (string) — Filter by item aspects.
- **category_ids** (string) — Category IDs to limit results.
- **charity_ids** (string) — Limit results to specified charities.
- **fieldgroups** (string) — Control returned metadata.
- **filter** (string) — Field filters.
- **limit** (string) — Page limit.
- **offset** (string) — Offset for pagination.
- **sort** (string) — Sort criteria.

## Request Body

```
{ "image": "SGVsbG8gd29ybGQh" }
```

## Response Example

```
{ "itemSummaries": [], "total": 0 }
```

Tags: search_by_image
