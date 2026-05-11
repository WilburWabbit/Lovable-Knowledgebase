# GET /category_tree/{category_tree_id}/get_category_suggestions

Get Suggested Categories

This call returns an array of category tree leaf nodes in the specified category tree that are considered by eBay to most closely correspond to the query string q.

## Parameters

- **category_tree_id** (string) *required* — The unique identifier of the eBay category tree for which suggested nodes are being requested.
- **q** (string) *required* — A quoted string that describes or characterizes the item being offered for sale.

## Request Body

```
null
```

## Response Example

```
{
  "categoryTreeId": "100",
  "categorySuggestions": [
    {
      "category": { "categoryId": "123", "categoryName": "Suggested Category" },
      "categoryTreeNodeLevel": 3
    }
  ]
}
```

Tags: category_tree
