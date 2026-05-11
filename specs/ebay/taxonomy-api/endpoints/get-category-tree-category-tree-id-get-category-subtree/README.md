# GET /category_tree/{category_tree_id}/get_category_subtree

Get a Category Subtree

This call retrieves the details of all nodes of the category tree hierarchy (the subtree) below a specified category of a category tree.

## Parameters

- **category_id** (string) *required* — The unique identifier of the category at the top of the subtree being requested.
- **category_tree_id** (string) *required* — The unique identifier of the eBay category tree from which a category subtree is being requested.

## Request Body

```
null
```

## Response Example

```
{
  "categoryTreeId": "100",
  "categoryTreeVersion": "123",
  "categorySubtreeNode": {
    "category": { "categoryId": "123", "categoryName": "SubCategory" }
  }
}
```

Tags: category_tree
