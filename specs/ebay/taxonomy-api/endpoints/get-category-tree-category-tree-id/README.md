# GET /category_tree/{category_tree_id}

Get a Category Tree

This call retrieves the complete category tree that is identified by the category_tree_id parameter. The response contains details of all nodes of the specified eBay category tree.

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
  "applicableMarketplaceIds": ["EBAY_MOTORS_US"],
  "rootCategoryNode": {
    "category": { "categoryId": "0", "categoryName": "Root" },
    "categoryTreeNodeLevel": 0,
    "leafCategoryTreeNode": false
  }
}
```

Tags: category_tree
