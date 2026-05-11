# GET /product/{epid}

getProduct

This method retrieves details of the catalog product identified by the eBay product identifier (ePID) specified in the request. These details include the product's title and description, aspects and their values, associated images, applicable category IDs, and any recognized identifiers that apply to the product. For a new listing, you can use the search method to identify candidate products on which to base the listing, then use the getProduct method to present the full details of those candidate products to the seller to make a a final selection.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — This method also uses the X-EBAY-C-MARKETPLACE-ID header to identify the seller's eBay marketplace. It is required for all marketplaces except EBAY_US, which is the default. Note: This method is limited to EBAY_US, EBAY_AU, EBAY_CA, and EBAY_GB values.
- **epid** (string) *required* — The ePID of the product being requested. This value can be discovered by issuing the search method and examining the value of the productSummaries.epid field for the desired returned product summary.

## Request Body

```
null
```

## Response Example

```
{
  "epid": "123456",
  "title": "Example Product Title",
  "description": "Product description text.",
  "brand": "BrandName",
  "primaryCategoryId": "1234",
  "image": {
    "imageUrl": "https://example.com/image.jpg",
    "width": 500,
    "height": 500
  },
  "aspects": [
    {
      "localizedName": "Color",
      "localizedValues": ["Black"]
    }
  ],
  "gtin": ["01234567890123"]
}
```

Tags: product
