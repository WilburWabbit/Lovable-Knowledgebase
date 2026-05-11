# GET /merchandised_product

Returns an array of products based on the category and metric specified.

This method returns an array of products based on the category and metric specified. This includes details of the product, such as the eBay product ID (EPID), title, and user reviews and ratings for the product. You can use the epid returned by this method in the Browse API search method to retrieve items for this product. Restrictions: To test getMerchandisedProducts in Sandbox, you must use category ID 9355 and the response will be mock data. For a list of supported sites and other restrictions, see API Restrictions.

## Parameters

- **aspect_filter** (string) — The aspect name/value pairs used to further refine product results. For example: /buy/marketing/v1_beta/merchandised_product?category_id=31388&metric_name=BEST_SELLING&aspect_filter=Brand:Canon. You can use the Browse API search method with the fieldgroups=ASPECT_REFINEMENTS field to return the aspects of a product.
- **category_id** (string) *required* — This query parameter limits the products returned to a specific eBay category. The list of eBay category IDs is not published and category IDs are not all the same across all the eBay maketplace. Maximum: 1. Required: 1.
- **limit** (string) — This value specifies the maximum number of products to return in a result set. Note: Maximum value means the method will return up to that many products per set, but it can be less than this value. Default: 8. Maximum: 100.
- **metric_name** (string) *required* — This value filters the result set by the specified metric. Only products in this metric are returned. Currently, the only metric supported is BEST_SELLING. Default: BEST_SELLING. Maximum: 1. Required: 1.

## Request Body

```
null
```

## Response Example

```
{
  "merchandisedProducts": [
    {
      "averageRating": "4.5",
      "epid": "219504846",
      "image": {
        "imageUrl": "https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/V9AAAOSw9VZd3m9~/$_57.JPG?set_id=8800005007",
        "height": 1600,
        "width": 1600
      },
      "marketPriceDetails": [
        {
          "conditionGroup": "NEW",
          "conditionIds": ["1000"],
          "estimatedStartPrice": {
            "currency": "USD",
            "value": "450.00"
          }
        }
      ],
      "ratingAspects": [
        {
          "count": 50,
          "description": "Is it a good value?",
          "name": "Value",
          "ratingAspectDistributions": [
            {
              "count": 45,
              "percentage": "90",
              "value": "TRUE"
            }
          ]
        }
      ],
      "ratingCount": 100,
      "reviewCount": 25,
      "title": "Canon EOS Rebel T6 Digital SLR Camera"
    }
  ],
  "warnings": []
}
```

Tags: merchandised_product
