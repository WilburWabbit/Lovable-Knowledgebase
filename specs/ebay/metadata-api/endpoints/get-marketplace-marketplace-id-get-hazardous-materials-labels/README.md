# GET /marketplace/{marketplace_id}/get_hazardous_materials_labels

getHazardousMaterialsLabels

This method returns hazardous materials label information for the specified eBay marketplace. The information includes IDs, descriptions, and URLs (as applicable) for the available signal words, statements, and pictograms. The returned statements are localized for the default langauge of the marketplace. If a marketplace does not support hazardous materials label information, an error is returned. This information is used by the seller to add hazardous materials label related information to their listings.

## Parameters

- **marketplace_id** (string) *required* — A path parameter that specifies the eBay marketplace for which hazardous materials label information shall be retrieved. Tip: See Request components for a list of valid eBay marketplace IDs.

## Request Body

```
null
```

## Response Example

```
{
  "pictograms": [
    {
      "pictogramDescription": "string",
      "pictogramId": "string",
      "pictogramUrl": "string"
    }
  ],
  "signalWords": [
    {
      "signalWordDescription": "string",
      "signalWordId": "string"
    }
  ],
  "statements": [
    {
      "statementDescription": "string",
      "statementId": "string"
    }
  ]
}
```

Tags: marketplace
