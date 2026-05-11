# GET /order/{orderId}/shipping_fulfillment/{fulfillmentId}

getShippingFulfillment

Use this call to retrieve the contents of a fulfillment based on its unique identifier, fulfillmentId (combined with the associated order's orderId).

## Parameters

- **fulfillmentId** (string) *required* — The unique identifier of the fulfillment.
- **orderId** (string) *required* — The unique identifier of the order.

## Request Body

```
null
```

## Response Example

```
{"fulfillmentId": "string", "shipmentTrackingNumber": "string"}
```

Tags: shipping_fulfillment
