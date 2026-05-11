# GET /ad_campaign/{campaign_id}/suggest_items

Suggest Items

Retrieves suggested items for targeted ads in a campaign.

## Parameters

- **campaign_id** (string) *required* — Unique campaign ID.
- **category_ids** (string) — Filter by category IDs.
- **limit** (string) — Max items to return.
- **offset** (string) — Items to skip.

## Request Body

```
null
```

## Response Example

```
{"suggestedItems": [{"listingId": "12345"}]}
```

Tags: campaign
