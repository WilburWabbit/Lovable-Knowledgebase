# GET /ad_campaign/{campaign_id}/ad_group/{ad_group_id}

Get Ad Group

Retrieves details of a specific ad group.

## Parameters

- **ad_group_id** (string) *required* — Unique ad group ID.
- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
null
```

## Response Example

```
{"adGroupId": "123", "name": "Standard Group", "adGroupStatus": "ACTIVE"}
```

Tags: ad_group
