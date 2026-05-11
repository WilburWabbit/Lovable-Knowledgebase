# POST /ad_campaign

Create Campaign

Creates a new Promoted Listings ad campaign. Identified items can be added by rule or specifically by listing ID.

## Parameters

_None_

## Request Body

```
{"campaignName": "Spring Sale", "startDate": "2023-04-01T00:00:00Z", "marketplaceId": "EBAY_US", "fundingStrategy": {"fundingModel": "COST_PER_SALE", "bidPercentage": "5.0"}}
```

## Response Example

```
{}
```

Tags: campaign
