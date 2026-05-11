# POST /ad_campaign/{campaign_id}/clone

Clone Campaign

Clones a rules-based campaign's criterion. Requires the campaign status to be ENDED.

## Parameters

- **campaign_id** (string) *required* — Campaign ID to clone.

## Request Body

```
{"campaignName": "Summer Sale Clone", "startDate": "2023-06-01T00:00:00Z"}
```

## Response Example

```
{}
```

Tags: campaign
