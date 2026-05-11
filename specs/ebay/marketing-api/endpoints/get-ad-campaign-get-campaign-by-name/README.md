# GET /ad_campaign/get_campaign_by_name

Get Campaign By Name

Retrieves details of a single campaign by name. Name must be an exact match.

## Parameters

- **campaign_name** (string) *required* — The exact name of the campaign.

## Request Body

```
null
```

## Response Example

```
{"campaignId": "12345", "campaignName": "Spring Sale", "campaignStatus": "RUNNING"}
```

Tags: campaign
