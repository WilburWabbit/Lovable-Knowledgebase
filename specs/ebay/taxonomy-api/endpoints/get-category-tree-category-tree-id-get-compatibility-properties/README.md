# GET /category_tree/{category_tree_id}/get_compatibility_properties

Get Compatibility Properties

This call retrieves the compatible vehicle aspects that are used to define a motor vehicle that is compatible with a motor vehicle part or accessory.

## Parameters

- **category_tree_id** (string) *required* — The unique identifier of category tree.
- **category_id** (string) *required* — The unique identifier of an eBay category.

## Request Body

```
null,response_example:
```

## Response Example

```
{
  "compatibilityProperties": [
    { "name": "Make", "localizedName": "Make" },
    { "name": "Model", "localizedName": "Model" }
  ]
}
```

Tags: category_tree
