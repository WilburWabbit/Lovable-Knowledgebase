# GET /item_snapshot

getItemSnapshotFeed

Downloads an Hourly Snapshot TSV_GZIP feed file containing details of all items that have changed within the specified day and hour for a specific category. Files are available with a 2-hour latency.

## Parameters

- **Accept** (string) *required* — The formats that the client accepts for the response.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The ID of the eBay marketplace where the item is hosted.
- **Range** (string) *required* — Range in bytes for chunked download. Maximum 100 MB.
- **category_id** (string) *required* — An eBay top-level category ID.
- **snapshot_date** (string) *required* — The date and hour of the snapshot (UTC yyyy-MM-ddThh:00:00.000Z).

## Request Body

```
null
```

## Response Example

```
{"items": [{"itemId": "v1|1**********2|4**********2", "availability": "AVAILABLE", "changeMetadata": "PRICE_CHANGE", "itemSnapshotDate": "2023-10-01T12:00:00.000Z"}]}
```

Tags: item_snapshot
