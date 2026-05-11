# GET /get_default_category_tree_id

Get a Default Category Tree ID

This call retrieves a reference to the default category tree associated with the specified eBay marketplace ID.

## Parameters

- **Accept-Language** (string) — Header used to indicate the natural language preferred.
- **marketplace_id** (string) *required* — The ID of the eBay marketplace for which the category tree ID is being requested.

## Request Body

```
null
```

## Response Example

```
{
  "categoryTreeId": "0",
  "categoryTreeVersion": "123"
}
```

Tags: category_tree
