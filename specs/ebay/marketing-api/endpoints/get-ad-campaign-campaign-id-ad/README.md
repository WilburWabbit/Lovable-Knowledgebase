# GET /ad_campaign/{campaign_id}/ad

Get Ads

Retrieves ads associated with a specific campaign. Supports pagination and filtering by status or listing ID.

## Parameters

- **ad_group_ids** (string) — Filter by ad group IDs (CPC only).
- **ad_status** (string) — Filter by ad status.
- **campaign_id** (string) *required* — Unique campaign ID.
- **limit** (string) — Max ads to return.
- **listing_ids** (string) — Filter by eBay listing IDs.
- **offset** (string) — Ads to skip.

## Request Body

```
null
```

## Response Example

```
{"ads": [{"adId": "111", "listingId": "222", "adStatus": "ACTIVE"}], "total": 1}
```

Tags: ad
