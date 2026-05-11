# POST /order/{orderId}/shipping_fulfillment

createShippingFulfillment

When you group an order's line items into one or more packages, each package requires a corresponding plan for handling, addressing, and shipping; this is a shipping fulfillment.

## Parameters

- **orderId** (string) *required* — The unique identifier of the order.

## Request Body

```
{"lineItems": [{"lineItemId": "string", "quantity": 1}], "shippingCarrierCode": "string", "trackingNumber": "string"}
```

## Response Example

```
{}
```

Tags: shipping_fulfillment
