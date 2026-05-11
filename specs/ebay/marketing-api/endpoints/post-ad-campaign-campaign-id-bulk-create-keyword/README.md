# POST /ad_campaign/{campaign_id}/bulk_create_keyword

Bulk Create Keywords

Associates keywords in bulk to an existing ad group in a CPC campaign.

## Parameters

- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"requests": [{"adGroupId": "123", "keywordText": "shoes", "matchType": "EXACT", "bid": {"value": "0.50", "currency": "USD"}}]}
```

## Response Example

```
{"responses": [{"keywordId": "999", "statusCode": 201}]}
```

Tags: keyword
