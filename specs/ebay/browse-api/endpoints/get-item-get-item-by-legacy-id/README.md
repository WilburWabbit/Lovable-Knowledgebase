# GET /item/get_item_by_legacy_id

Retrieve item details using a legacy ID

This method is a bridge between the eBay legacy APIs and the eBay Buy APIs. It lets you use legacy item ids to retrieve the details of a specific item and its RESTful item ID.

## Parameters

- **fieldgroups** (string) — Control what is returned. Only value supported is PRODUCT.
- **legacy_item_id** (string) *required* — The legacy item ID of an item or a group parent.
- **legacy_variation_id** (string) — Legacy ID of a specific item variation.
- **legacy_variation_sku** (string) — Legacy SKU created by the seller.

## Request Body

```
null
```

## Response Example

```
{ "itemId": "v1|110039490209|0", "title": "Example Item", "price": { "value": "15.00", "currency": "USD" } }
```

Tags: item
