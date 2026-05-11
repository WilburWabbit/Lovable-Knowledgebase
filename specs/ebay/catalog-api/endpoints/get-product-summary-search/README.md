# GET /product_summary/search

search

This method searches for and retrieves summaries of one or more products in the eBay catalog that match the search criteria provided by a seller. The seller can use the summaries to select the product in the eBay catalog that corresponds to the item that the seller wants to offer for sale. When a corresponding product is found and adopted by the seller, eBay will use the product information to populate the item listing. The criteria supported by search include keywords, product categories, and category aspects. To see the full details of a selected product, use the getProduct call.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — This method also uses the X-EBAY-C-MARKETPLACE-ID header to identify the seller's eBay marketplace. It is required for all marketplaces except EBAY_US, which is the default. Note: This method is limited to EBAY_US, EBAY_AU, EBAY_CA, and EBAY_GB values.
- **aspect_filter** (string) — An eBay category and one or more aspects of that category, with the values that can be used to narrow down the collection of products returned by this call.
- **category_ids** (string) — One or more comma-separated category identifiers for narrowing down the collection of products returned by this call.
- **fieldgroups** (string) — The type of information to return in the response. Valid values: ASPECT_REFINEMENTS, FULL, MATCHING_PRODUCTS.
- **gtin** (string) — A string consisting of one or more comma-separated Global Trade Item Numbers (GTINs) that identify products to search for.
- **limit** (string) — The number of product summaries to return. Maximum: 200. Default: 50.
- **mpn** (string) — A string consisting of one or more comma-separated Manufacturer Part Numbers (MPNs) that identify products to search for.
- **offset** (string) — This parameter is reserved for internal or future use.
- **q** (string) — A string consisting of one or more keywords to use to search for products in the eBay catalog.

## Request Body

```
null
```

## Response Example

```
{
  "productSummaries": [
    {
      "epid": "123456",
      "title": "Example Product",
      "brand": "BrandName",
      "image": {
        "imageUrl": "https://example.com/image.jpg"
      }
    }
  ],
  "limit": 50,
  "offset": 0,
  "total": 1
}
```

Tags: product_summary
