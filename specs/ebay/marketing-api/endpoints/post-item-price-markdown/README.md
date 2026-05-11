# POST /item_price_markdown

Create Item Price Markdown Promotion

Creates a markdown promotion with direct discount on items. Buyer does not need to meet a threshold.

## Parameters

_None_

## Request Body

```
{"name": "Flash Sale", "startDate": "2023-05-01T00:00:00Z", "endDate": "2023-05-05T00:00:00Z", "marketplaceId": "EBAY_US", "discountRules": [{"discountBenefit": {"percentageOffItem": "20"}}]}
```

## Response Example

```
{}
```

Tags: item_price_markdown
