# GET /category_tree/{category_tree_id}/fetch_item_aspects

Get Aspects for All Leaf Categories in a Marketplace

This call returns a complete list of aspects for all of the leaf categories that belong to an eBay marketplace.

## Parameters

- **category_tree_id** (string) *required* — The unique identifier of the eBay category tree being requested.

## Request Body

```
null
```

## Response Example

```
{
  "categoryTreeId": "100",
  "categoryTreeVersion": "123",
  "categoryAspects": []
}
```

Tags: category_tree
