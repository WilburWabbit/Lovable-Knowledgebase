# GET /shipment/{shipmentId}

getShipment

This method retrieves the shipment details for the specified shipment ID. Call createFromShippingQuote to generate a shipment ID.

## Parameters

- **shipmentId** (string) *required* — This path parameter specifies the unique eBay-assigned ID of the shipment you want to retrieve. The shipmentId value is generated and returned by a call to createFromShippingQuote.

## Request Body

```
null
```

## Response Example

```
{
  "shipmentId": "S-123-456",
  "shipmentTrackingNumber": "TRACK123456",
  "labelDownloadUrl": "https://api.ebay.com/label/download",
  "rate": {
    "shippingCarrierName": "USPS",
    "shippingServiceName": "Priority Mail"
  }
}
```

Tags: shipment
