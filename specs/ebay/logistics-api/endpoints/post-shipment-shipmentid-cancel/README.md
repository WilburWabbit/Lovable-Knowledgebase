# POST /shipment/{shipmentId}/cancel

cancelShipment

This method cancels the shipment associated with the specified shipment ID and the associated shipping label is deleted. When you cancel a shipment, the totalShippingCost of the canceled shipment is refunded to the account established by the user's billing agreement. Note that you cannot cancel a shipment if you have used the associated shipping label.

## Parameters

- **shipmentId** (string) *required* — This path parameter specifies the unique eBay-assigned ID of the shipment to be canceled. The shipmentId value is generated and returned by a call to createFromShippingQuote.

## Request Body

```
null
```

## Response Example

```
{
  "shipmentId": "S-123-456",
  "cancellation": {
    "cancellationStatus": "CANCELLED",
    "cancellationRequestedDate": "2023-10-01T10:00:00.000Z"
  }
}
```

Tags: shipment
