# GET /promotion

Get Promotions

Retrieves a list of a seller's promotions. Filter by status, type, or marketplace.

## Parameters

- **limit** (string) — Max promotions to return.
- **marketplace_id** (string) *required* — Marketplace ID.
- **offset** (string) — Number of promotions to skip.
- **promotion_status** (string) — Filter by status.
- **promotion_type** (string) — Filter by type.
- **q** (string) — Keywords to search in title.
- **sort** (string) — Sort order.

## Request Body

```
null
```

## Response Example

```
{"promotions": [{"promotionId": "123@EBAY_US", "name": "Sale"}]}
```

Tags: promotion
