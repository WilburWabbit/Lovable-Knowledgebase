# GET /marketplace/{marketplace_id}/get_extended_producer_responsibility_policies

getExtendedProducerResponsibilityPolicies

This method returns the Extended Producer Responsibility policies for one, multiple, or all eBay categories in an eBay marketplace. The identifier of the eBay marketplace is passed in as a path parameter, and unless one or more eBay category IDs are passed in through the filter query parameter, this method will return metadata on every applicable category for the specified marketplace. Note: Currently, the Extended Producer Responsibility policies are only applicable to a limited number of categories, and only in the EBAY_FR marketplace. Tip: This method can potentially return a very large response payload. eBay recommends that the response payload be compressed by passing in the Accept-Encoding request header and setting the value to application/gzip.

## Parameters

- **filter** (string) — A query parameter that can be used to limit the response by returning policy information for only the selected sections of the category tree. Supply categoryId values for the sections of the tree that should be returned. When a categoryId value is specified, the returned category tree includes the policies for that parent node, as well as the policies for any child nodes below that parent node. Pass in the categoryId values using a URL-encoded, pipe-separated ('|') list. For example: filter=categoryIds%3A%7B100%7C101%7C102%7D Maximum: 50
- **marketplace_id** (string) *required* — A path parameter that specifies the eBay marketplace for which policy information shall be retrieved. Tip: See Request components for a list of valid eBay marketplace IDs.

## Request Body

```
null
```

## Response Example

```
{
  "extendedProducerResponsibilities": [
    {
      "categoryId": "string",
      "categoryTreeId": "string",
      "supportedAttributes": [
        {
          "enabledForVariations": true,
          "name": "string",
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
