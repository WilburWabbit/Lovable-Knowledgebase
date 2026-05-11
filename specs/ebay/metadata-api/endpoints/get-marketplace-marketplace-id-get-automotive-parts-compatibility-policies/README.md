# GET /marketplace/{marketplace_id}/get_automotive_parts_compatibility_policies

getAutomotivePartsCompatibilityPolicies

This method returns the eBay policies that define how to list automotive-parts-compatibility items in the categories of a specific marketplace. By default, this method returns the entire category tree for the specified marketplace. You can limit the size of the result set by using the filter query parameter to specify only the category IDs you want to review. Tip: This method can potentially return a very large response payload. eBay recommends that the response payload be compressed by passing in the Accept-Encoding request header and setting the value to application/gzip.

## Parameters

- **filter** (string) — This query parameter limits the response by returning policy information for only the selected sections of the category tree. Supply categoryId values for the sections of the tree you want returned. When you specify a categoryId value, the returned category tree includes the policies for that parent node, plus the policies for any leaf nodes below that parent node. The parameter takes a list of categoryId values and you can specify up to 50 separate category IDs. Separate multiple values with a pipe character ('|'). If you specify more than 50 categoryId values, eBay returns the policies for the first 50 IDs and a warning that not all categories were returned. Example: filter=categoryIds:{100|101|102} Note that you must URL-encode the parameter list, which results in the following filter for the above example: filter=categoryIds%3A%7B100%7C101%7C102%7D
- **marketplace_id** (string) *required* — This path parameter specifies the eBay marketplace for which policy information is retrieved. Note: Only the following eBay marketplaces support automotive parts compatibility: EBAY_US, EBAY_AU, EBAY_CA, EBAY_DE, EBAY_ES, EBAY_FR, EBAY_GB, EBAY_IT

## Request Body

```
null
```

## Response Example

```
{
  "automotivePartsCompatibilityPolicies": [
    {
      "categoryId": "string",
      "categoryTreeId": "string",
      "compatibilityBasedOn": "string",
      "compatibleVehicleTypes": [
        "string"
      ],
      "maxNumberOfCompatibleVehicles": 0
    }
  ],
  "warnings": [
    {
      "category": "string",
      "domain": "string",
      "errorId": 0,
      "inputRefIds": [
        "string"
      ],
      "longMessage": "string",
      "message": "string",
      "outputRefIds": [
        "string"
      ],
      "parameters": [
        {
          "name": "string",
          "value": "string"
        }
      ],
      "subdomain": "string"
    }
  ]
}
```

Tags: marketplace
