# POST /item_promotion

Create Item Promotion

Creates an item promotion where a discount is applied when buyer meets certain criteria (threshold).

## Parameters

_None_

## Request Body

```
{"name": "Summer Discount", "marketplaceId": "EBAY_US", "promotionType": "ORDER_DISCOUNT", "discountRules": [{"discountBenefit": {"percentageOffOrder": "10"}, "discountSpecification": {"minAmount": {"value": "50", "currency": "USD"}}}]}
```

## Response Example

```
{}
```

Tags: item_promotion
