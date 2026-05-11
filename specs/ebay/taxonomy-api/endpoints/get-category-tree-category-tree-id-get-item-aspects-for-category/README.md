# GET /category_tree/{category_tree_id}/get_item_aspects_for_category

getItemAspectsForCategory

This call returns a list of aspects that are appropriate or necessary for accurately describing items in the specified leaf category.

## Parameters

- **category_id** (string) *required* — The unique identifier of the leaf category for which aspects are being requested.
- **category_tree_id** (string) *required* — The unique identifier of the eBay category tree from which the specified category's aspects are being requested.

## Request Body

```
null
```

## Response Example

```
{
  "aspects": [
    {
      "localizedAspectName": "Color",
      "aspectConstraint": {
        "aspectDataType": "STRING",
        "aspectRequired": true
      }
    }
  ]
}
```

Tags: category_tree
