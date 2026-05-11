# POST /shipping_quote

createShippingQuote

The createShippingQuote method returns a shipping quote that contains a list of live rates. Each rate represents an offer made by a shipping carrier for a specific service and each offer has a live quote for the base service cost. Rates have a time window in which they are live, and rates expire when their purchase window ends. If offered by the carrier, rates can include shipping options (and their associated prices), and users can add any offered shipping option to the base service should they desire. Also, depending on the services required, rates can also include pickup and delivery windows. Each rate is for a single package and is based on the following information: The shipping origin, The shipping destination, The package size (weight and dimensions). Rates are identified by a unique eBay-assigned rateId and rates are based on price points, pickup and delivery time frames, and other user requirements. Because each rate offered must be compliant with the eBay shipping program, all rates reflect eBay-negotiated prices. The various rates returned in a shipping quote offer the user a choice from which they can choose a shipping service that best fits their needs. Select the rate for your shipment and using the associated rateId, call createFromShippingQuote to create a shipment and generate a shipping label that you can use to ship the package.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — This header parameter specifies the eBay marketplace for the shipping quote that is being created. For a list of valid values, refer to the section Marketplace ID Values in the Using eBay RESTful APIs guide.

## Request Body

```
{
  "orders": [{ "orderId": "12-34567-89012", "channel": "EBAY" }],
  "packageSpecification": {
    "dimensions": { "length": "10", "width": "8", "height": "5", "unit": "INCH" },
    "weight": { "value": "2.5", "unit": "POUND" }
  },
  "shipFrom": {
    "contactAddress": { "addressLine1": "123 Main St", "city": "San Jose", "stateOrProvince": "CA", "postalCode": "95125", "countryCode": "US" }
  },
  "shipTo": {
    "contactAddress": { "addressLine1": "456 Oak Ave", "city": "Los Angeles", "stateOrProvince": "CA", "postalCode": "90001", "countryCode": "US" }
  }
}
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
