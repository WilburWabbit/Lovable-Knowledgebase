# GET /category_tree/{category_tree_id}/get_compatibility_property_values

Get Compatibility Property Values

This call retrieves applicable compatible vehicle property values based on the specified eBay marketplace, specified eBay category, and filters used in the request.

## Parameters

- **category_tree_id** (string) *required* — Unique identifier of the category tree.
- **compatibility_property** (string) *required* — One compatible vehicle property applicable (e.g. Trim).
- **category_id** (string) *required* — The unique identifier of an eBay category.
- **filter** (string) — One or more compatible vehicle property name/value pairs.

## Request Body

```
null
```

## Response Example

```
{
  "compatibilityPropertyValues": [
    { "value": "LE Sedan 4-Door" }
  ]
}
```

Tags: category_tree
