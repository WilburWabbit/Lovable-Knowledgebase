# GET /item_priority

getItemPriorityFeed

Download an Item Priority feed file to track changes (deltas) in the status of priority items, such as when an item is added or removed from a campaign. Required consuming daily feeds first.

## Parameters

- **Accept** (string) *required* — The formats that the client accepts for the response.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The ID of the eBay marketplace where the item is hosted.
- **Range** (string) *required* — Header specifying content range to be retrieved. Example: bytes=0-102400.
- **category_id** (string) *required* — An eBay top-level category ID.
- **date** (string) *required* — The date of the feed (yyyyMMdd).

## Request Body

```
null
```

## Response Example

```
{"itemDelta": [{"itemId": "v1|1********2|4********2", "changeMetadata": "ADDED_TO_CAMPAIGN", "priorityListingPayload": "amdata=enc%3A..."}]}
```

Tags: item_priority
