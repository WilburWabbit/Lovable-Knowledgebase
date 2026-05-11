# POST /item/{item_id}/check_compatibility

Check item compatibility

This method checks if a product (car, truck, motorcycle) is compatible with the specified item/part.

## Parameters

- **item_id** (string) *required* — The eBay RESTful identifier of an item/part.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The ID of the eBay marketplace.

## Request Body

```
{ "compatibilityProperties": [ { "name": "Year", "value": "2019" }, { "name": "Make", "value": "Honda" } ] }
```

## Response Example

```
{ "compatibilityStatus": "COMPATIBLE" }
```

Tags: item
