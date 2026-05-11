# PUT /ad_campaign/{campaign_id}/ad_group/{ad_group_id}

Update Ad Group

Updates an ad group's bid, status, or name.

## Parameters

- **ad_group_id** (string) *required* — Unique ad group ID.
- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"name": "Updated Ad Group", "adGroupStatus": "PAUSED", "defaultBid": {"value": "0.60", "currency": "USD"}}
```

## Response Example

```
{}
```

Tags: ad_group
