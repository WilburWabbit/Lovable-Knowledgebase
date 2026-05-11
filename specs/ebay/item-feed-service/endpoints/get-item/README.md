# GET /item

getItemFeed

This method lets you download a TSV_GZIP (tab separated value gzip) Item feed file. The feed file contains all the items from all the child categories of the specified category. There are two types of item feed files generated: Daily Item feed (NEWLY_LISTED) and Weekly Item Bootstrap feed (ALL_ACTIVE).

## Parameters

- **Accept** (string) *required* — The formats that the client accepts for the response. Default: application/json,text/tab-separated-values
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The ID of the eBay marketplace where the item is hosted (e.g., EBAY_US).
- **Range** (string) *required* — This header specifies the range in bytes of the chunks of the gzip file being returned. Format: bytes=startpos-endpos. Maximum: 100 MB.
- **feed_scope** (string) *required* — Specifies the type of feed file to return (NEWLY_LISTED or ALL_ACTIVE).
- **category_id** (string) *required* — An eBay top-level category ID of the items to be returned in the feed file.
- **date** (string) — The date of the daily Item feed file (yyyyMMdd). Required only when feed_scope=NEWLY_LISTED.

## Request Body

```
null
```

## Response Example

```
{"items": [{"itemId": "v1|1**********2|4**********2", "title": "Example Item Title", "priceValue": "10.00", "priceCurrency": "USD", "availability": "AVAILABLE"}]}
```

Tags: item
