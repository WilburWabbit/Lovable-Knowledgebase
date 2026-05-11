# POST /shipment/create_from_shipping_quote

createFromShippingQuote

This method creates a shipment based on the shippingQuoteId and rateId values supplied in the request. The rate identified by the rateId value specifies the carrier and service for the package shipment, and the rate ID must be contained in the shipping quote identified by the shippingQuoteId value. Call createShippingQuote to retrieve a set of live shipping rates. When you create a shipment, eBay generates a shipping label that you can download and use to ship your package. In a createFromShippingQuote request, sellers can include a list of shipping options they want to add to the base service quoted in the selected rate. The list of available shipping options is specific to each quoted rate and if available, the options are listed in the rate container of the of the shipping quote. In addition to a configurable return-to location and other details about the shipment, the response to this method includes: The shipping carrier and service to be used for the package shipment, A list of selected shipping options, if any, The shipment tracking number, The total shipping cost (the sum cost of the base shipping service and any added options). When you create a shipment, your billing agreement account is charged the sum of the baseShippingCost and the total cost of any additional shipping options you might have selected. Use the URL returned in labelDownloadUrl field, or call downloadLabelFile with the shipmentId value from the response, to download a shipping label for your package. Important! Sellers must set up their payment method with eBay before they can use this method to create a shipment and the associated shipping label.

## Parameters

_None_

## Request Body

```
{
  "additionalOptions": [
    {
      "additionalCost": {
        "currency": "USD",
        "value": "1.00"
      },
      "optionType": "INSURANCE"
    }
  ],
  "labelCustomMessage": "Handle with care",
  "labelSize": "4\"x6\"",
  "rateId": "R-123-456",
  "returnTo": {
    "fullName": "John Doe",
    "contactAddress": {
      "addressLine1": "123 Main St",
      "city": "San Jose",
      "stateOrProvince": "CA",
      "postalCode": "95125",
      "countryCode": "US"
    }
  },
  "shippingQuoteId": "Q-123-456"
}
```

## Response Example

```
{
  "shipmentId": "S-123-456",
  "shipmentTrackingNumber": "TRACK123456",
  "labelDownloadUrl": "https://api.ebay.com/label/download",
  "totalShippingCost": {
    "currency": "USD",
    "value": "15.00"
  }
}
```

Tags: shipment
