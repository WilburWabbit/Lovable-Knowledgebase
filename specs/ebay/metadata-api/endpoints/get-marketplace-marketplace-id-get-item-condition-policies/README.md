# GET /marketplace/{marketplace_id}/get_item_condition_policies

getItemConditionPolicies

This method returns item condition metadata on one, multiple, or all eBay categories on an eBay marketplace. This metadata consists of the different item conditions (with IDs) that an eBay category supports, and a boolean to indicate if an eBay category requires an item condition. The identifier of the eBay marketplace is passed in as a path parameter, and unless one or more eBay category IDs are passed in through the filter query parameter, this method will return metadata on every single category for the specified marketplace. If you only want to view item condition metadata for one eBay category or a select group of eBay categories, you can pass in up to 50 eBay category ID through the filter query parameter. Important: Certified - Refurbished-eligible sellers, and sellers who are eligible to list with the new values (EXCELLENT_REFURBISHED, VERY_GOOD_REFURBISHED, and GOOD_REFURBISHED) must use an OAuth token created with the authorization code grant flow and https://api.ebay.com/oauth/api_scope/sell.inventory scope in order to retrieve the refurbished conditions for the relevant categories. See the eBay Refurbished Program - Category and marketplace support topic for the categories and marketplaces that support these refurbished conditions. These restricted item conditions will not be returned if an OAuth token created with the client credentials grant flow and https://api.ebay.com/oauth/api_scope scope is used, or if any seller is not eligible to list with that item condition. See the Specifying OAuth scopes topic for more information about specifying scopes. Tip: This method can potentially return a very large response payload. eBay recommends that the response payload be compressed by passing in the Accept-Encoding request header and setting the value to application/gzip.

## Parameters

- **filter** (string) — This query parameter limits the response by returning policy information for only the selected sections of the category tree. Supply categoryId values for the sections of the tree you want returned. When you specify a categoryId value, the returned category tree includes the policies for that parent node, plus the policies for any leaf nodes below that parent node. The parameter takes a list of categoryId values and you can specify up to 50 separate category IDs. Separate multiple values with a pipe character ('|'). If you specify more than 50 categoryId values, eBay returns the policies for the first 50 IDs and a warning that not all categories were returned. Example: filter=categoryIds:{100|101|102} Note that you must URL-encode the parameter list, which results in the following filter for the above example: filter=categoryIds%3A%7B100%7C101%7C102%7D
- **marketplace_id** (string) *required* — This path parameter specifies the eBay marketplace for which policy information is retrieved. See the following page for a list of valid eBay marketplace IDs: Request components.

## Request Body

```
null
```

## Response Example

```
{
  "itemConditionPolicies": [
    {
      "categoryId": "string",
      "categoryTreeId": "string",
      "itemConditionRequired": true,
      "itemConditions": [
        {
          "conditionDescription": "string",
          "conditionId": "string",
          "usage": "string"
        }
      ]
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
