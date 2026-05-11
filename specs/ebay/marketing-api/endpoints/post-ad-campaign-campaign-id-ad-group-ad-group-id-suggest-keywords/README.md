# POST /ad_campaign/{campaign_id}/ad_group/{ad_group_id}/suggest_keywords

Suggest Keywords

Retrieves keyword ideas to be targeted for a CPC campaign.

## Parameters

- **ad_group_id** (string) *required* — Unique ad group ID.
- **campaign_id** (string) *required* — Unique campaign ID.

## Request Body

```
{"listingIds": ["123456789"], "matchType": "BROAD"}
```

## Response Example

```
{"suggestedKeywords": [{"keywordText": "running shoes", "matchType": "BROAD"}]}
```

Tags: ad_group
