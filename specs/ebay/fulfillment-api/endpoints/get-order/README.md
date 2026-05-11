# GET /order

getOrders

Use this call to search for and retrieve one or more orders based on their creation date, last modification date, or fulfillment status using the filter parameter. You can alternatively specify a list of orders using the orderIds parameter. Include the optional fieldGroups query parameter set to TAX_BREAKDOWN to return a breakdown of the taxes and fees.

## Parameters

- **fieldGroups** (string) — The response type associated with the order. The only presently supported value is TAX_BREAKDOWN.
- **filter** (string) — One or more comma-separated criteria for narrowing down the collection of orders returned by this call.
- **limit** (string) — The number of orders to return per page of the result set.
- **offset** (string) — Specifies the number of orders to skip in the result set before returning the first order in the paginated response.
- **orderIds** (string) — A comma-separated list of the unique identifiers of the orders to retrieve (maximum 50).

## Request Body

```
null
```

## Response Example

```
{"total": 1, "limit": 50, "offset": 0, "orders": []}
```

Tags: order
