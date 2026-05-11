# POST /find

findListingRecommendations

The find method currently returns information for a single recommendation type (AD) which contains information that sellers can use to configure Promoted Listings ad campaigns. The response from this method includes an array of the seller's listing IDs, where each element in the array contains recommendations related to the associated listing ID. For details on how to use this method, see Using the Recommendation API to help configure campaigns.

## Parameters

- **filter** (string) — Provide a list of key-value pairs to specify the criteria you want to use to filter the response. Currently, the only supported filter value is recommendationTypes and it supports only the (\"AD\") type. Example: filter=recommendationTypes:{AD}
- **limit** (string) — Use this query parameter to set the maximum number of ads to return on a page from the paginated response. Default: 10 Maximum: 500
- **offset** (string) — Specifies the number of ads to skip in the result set before returning the first ad in the paginated response. Default: 0
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — Use this header to specify the eBay marketplace where you list the items for which you want to get recommendations.

## Request Body

```
{"listingIds": ["string"]}
```

## Response Example

```
{
  "href": "string",
  "limit": 10,
  "listingRecommendations": [
    {
      "listingId": "string",
      "marketing": {
        "ad": {
          "bidPercentages": [
            {
              "basis": "TRENDING",
              "value": "5.0"
            }
          ],
          "promoteWithAd": "RECOMMENDED"
        },
        "message": "string"
      }
    }
  ],
  "next": "string",
  "offset": 0,
  "prev": "string",
  "total": 1
}
```

Tags: listing_recommendation
