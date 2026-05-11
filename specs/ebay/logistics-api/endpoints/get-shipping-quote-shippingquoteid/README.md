# GET /shipping_quote/{shippingQuoteId}

getShippingQuote

This method retrieves the complete details of the shipping quote associated with the specified shippingQuoteId value. A shipping quote pertains to a single specific package and contains a set of shipping rates that quote the cost to ship the package by different shipping carriers and services. The quotes are based on the package's origin, destination, and size. Call createShippingQuote to create a shippingQuoteId.

## Parameters

- **shippingQuoteId** (string) *required* — This path parameter specifies the unique eBay-assigned ID of the shipping quote you want to retrieve. The shippingQuoteId value is generated and returned by a call to createShippingQuote.

## Request Body

```
null
```

## Response Example

```
{
  "shippingQuoteId": "Q-123-456",
  "rates": [
    {
      "rateId": "R-123-456",
      "shippingCarrierName": "USPS",
      "shippingServiceName": "Priority Mail",
      "baseShippingCost": { "value": "12.50", "currency": "USD" }
    }
  ]
}
```

Tags: shipping_quote
