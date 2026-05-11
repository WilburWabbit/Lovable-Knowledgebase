# GET /order/{orderId}/shipping_fulfillment

getShippingFulfillments

Use this call to retrieve the contents of all fulfillments currently defined for a specified order based on the order's unique identifier, orderId.

## Parameters

- **orderId** (string) *required* — The unique identifier of the order.

## Request Body

```
null
```

## Response Example

```
{"total": 1, "fulfillments": []}
```

Tags: shipping_fulfillment
