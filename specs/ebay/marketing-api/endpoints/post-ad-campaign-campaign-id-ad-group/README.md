# POST /ad_campaign/{campaign_id}/ad_group

Create Ad Group

Adds an ad group to an existing CPC campaign.

## Parameters

- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"name": "Main Ad Group", "defaultBid": {"value": "0.50", "currency": "USD"}}
```

## Response Example

```
{}
```

Tags: ad_group
