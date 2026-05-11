# GET /item/{item_id}

Retrieve details of a specific item

This method retrieves the details of a specific item, such as description, price, category, etc.

## Parameters

- **fieldgroups** (string) — Control what is returned. Valid Values: PRODUCT or COMPACT.
- **item_id** (string) *required* — The eBay RESTful identifier of an item.

## Request Body

```
null
```

## Response Example

```
{ "itemId": "v1|272394640372|0", "title": "Example Item", "price": { "value": "20.00", "currency": "USD" } }
```

Tags: item
