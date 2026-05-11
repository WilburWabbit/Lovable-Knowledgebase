# GET /ad_campaign

Get Campaigns

This method retrieves the details for all of the seller's defined campaigns. Filter by name, status, or date range.

## Parameters

- **campaign_name** (string) — Specifies the campaign name.
- **campaign_status** (string) — Filter by campaign status.
- **end_date_range** (string) — Filter by campaign end date range.
- **funding_strategy** (string) — Filter by funding strategy (CPS or CPC).
- **limit** (string) — Maximum number of campaigns to return.
- **offset** (string) — Number of campaigns to skip.
- **start_date_range** (string) — Filter by campaign start date range.

## Request Body

```
null
```

## Response Example

```
{"campaigns": [{"campaignId": "12345", "campaignName": "Spring Sale", "campaignStatus": "RUNNING"}], "total": 1}
```

Tags: campaign
