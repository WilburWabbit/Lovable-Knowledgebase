# GET /item/

Retrieve details of specific items in bulk

This method retrieves the details of specific items that the buyer needs to make a purchasing decision. Note: This is a (Limited Release). For this method, only a subset of fields are returned.

## Parameters

- **item_ids** (string) — A list of item IDs. comma separated values. Maximum allowed itemIDs: 20
- **item_group_ids** (string) — A list of item group IDs. comma separated values. Maximum allowed itemGroupIDs: 10

## Request Body

```
null
```

## Response Example

```
{ "items": [ { "itemId": "v1|272394640372|0", "title": "Example Item", "price": { "value": "10.00", "currency": "USD" } } ], "total": 1 }
```

Tags: item
