# GET /ad_campaign/{campaign_id}/ad_group

Get Ad Groups

Retrieves ad groups for a specific CPC campaign. Each campaign can have only one ad group.

## Parameters

- **ad_group_status** (string) — Filter by ad group status.
- **campaign_id** (string) *required* — Unique campaign ID.
- **limit** (string) — Number of results to return.
- **offset** (string) — Number of results to skip.

## Request Body

```
null
```

## Response Example

```
{"adGroups": [{"adGroupId": "123", "name": "Standard Group", "adGroupStatus": "ACTIVE"}]}
```

Tags: ad_group
