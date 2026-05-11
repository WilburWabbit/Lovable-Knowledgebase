# POST /ad_campaign/{campaign_id}/ad_group/{ad_group_id}/suggest_bids

Suggest Bids

Retrieves suggested bids for input keywords and match types in a CPC campaign.

## Parameters

- **ad_group_id** (string) *required* — Unique ad group ID.
- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"keywords": [{"keywordText": "shoes", "matchType": "EXACT"}]}
```

## Response Example

```
{"suggestedBids": [{"keywordText": "shoes", "matchType": "EXACT", "proposedBid": {"value": "0.75", "currency": "USD"}}]}
```

Tags: ad_group
