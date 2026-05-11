# GET /ad_campaign/find_campaign_by_ad_reference

Find Campaign By Ad Reference

Retrieves campaigns containing a specific listing identified by listing ID or inventory reference.

## Parameters

- **inventory_reference_id** (string) — Seller's inventory reference ID.
- **inventory_reference_type** (string) — The type of inventory reference ID.
- **listing_id** (string) — eBay listing ID.

## Request Body

```
null
```

## Response Example

```
{"campaigns": [{"campaignId": "12345", "campaignName": "Spring Sale"}]}
```

Tags: campaign
