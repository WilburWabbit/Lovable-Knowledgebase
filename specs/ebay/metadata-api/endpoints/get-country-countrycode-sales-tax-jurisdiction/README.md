# GET /country/{countryCode}/sales_tax_jurisdiction

getSalesTaxJurisdictions

This method retrieves all the sales tax jurisdictions for the country that you specify in the countryCode path parameter. Countries with valid sales tax jurisdictions are Canada and the US. The response from this call tells you the jurisdictions for which a seller can configure tax tables. Although setting up tax tables is optional, you can use the createOrReplaceSalesTax in the Account API call to configure the tax tables for the jurisdictions you sell to.

## Parameters

- **countryCode** (string) *required* — This path parameter specifies the two-letter ISO 3166 country code for the country whose jurisdictions you want to retrieve. eBay provides sales tax jurisdiction information for Canada and the United States.Valid values for this path parameter are CA and US.

## Request Body

```
null
```

## Response Example

```
{
  "salesTaxJurisdictions": [
    {
      "salesTaxJurisdictionId": "string"
    }
  ]
}
```

Tags: country
