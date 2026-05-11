# GET /order/{orderId}

getOrder

Use this call to retrieve the contents of an order based on its unique identifier, orderId.

## Parameters

- **fieldGroups** (string) — The response type associated with the order. The only presently supported value is TAX_BREAKDOWN.
- **orderId** (string) *required* — The unique identifier of the order.

## Request Body

```
null
```

## Response Example

```
{"orderId": "string", "orderFulfillmentStatus": "FULFILLED"}
```

Tags: order
