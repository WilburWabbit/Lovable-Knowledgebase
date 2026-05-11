# GET /find_eligible_items

findEligibleItems

This method evaluates a seller's current listings and returns the set of IDs that are eligible for a seller-initiated discount offer to a buyer. A listing ID is returned only when one or more buyers have shown an 'interest' in the listing.

## Parameters

- **limit** (string) — This query parameter specifies the maximum number of items to return from the result set on a page in the paginated response. Minimum: 1, Maximum: 200, Default: 10
- **offset** (string) — This query parameter specifies the number of results to skip in the result set before returning the first result in the paginated response. Default: 0
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The eBay marketplace on which you want to search for eligible listings.

## Request Body

```
null
```

## Response Example

```
{
  "eligibleItems": [
    {
      "listingId": "123456789012"
    }
  ],
  "href": "https://api.ebay.com/sell/negotiation/v1/find_eligible_items?limit=10&offset=0",
  "limit": 10,
  "next": "https://api.ebay.com/sell/negotiation/v1/find_eligible_items?limit=10&offset=10",
  "offset": 0,
  "prev": "",
  "total": 1
}
```

Tags: offer
