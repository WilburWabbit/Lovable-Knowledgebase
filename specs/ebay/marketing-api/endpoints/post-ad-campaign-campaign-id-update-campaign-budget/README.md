# POST /ad_campaign/{campaign_id}/update_campaign_budget

Update Campaign Budget

Updates the daily budget for a CPC campaign.

## Parameters

- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"daily": {"amount": {"value": "75.00", "currency": "USD"}}}
```

## Response Example

```
{}
```

Tags: campaign
