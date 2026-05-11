# GET /item_group

getItemGroupFeed

This method lets you download a TSV_GZIP (tab separated value gzip) Item Group feed file. An item group is an item that has various aspect differences, such as color, size, storage capacity, etc. It contains variation information for items returned in the Item feed file.

## Parameters

- **Accept** (string) *required* — The formats that the client accepts for the response.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The ID of the eBay marketplace where the item is hosted.
- **Range** (string) — Range in bytes for partial download.
- **feed_scope** (string) *required* — Specifies the type of file to return (NEWLY_LISTED or ALL_ACTIVE).
- **category_id** (string) *required* — An eBay top-level category ID.
- **date** (string) — Date of the feed file (yyyyMMdd).

## Request Body

```
null
```

## Response Example

```
{"itemGroups": [{"itemGroupId": "v1|1**********2|0", "title": "Example Group Title", "variesByLocalizedAspects": "Q29sb3I=|U2l6ZQ=="}]}
```

Tags: item_group
