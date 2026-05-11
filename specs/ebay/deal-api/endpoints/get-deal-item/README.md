# GET /deal_item

getDealItems

This method retrieves a paginated set of deal items. The result set contains all deal items associated with the specified search criteria and marketplace ID.

## Parameters

- **category_ids** (string) — The unique identifier of the eBay category for the search.
- **commissionable** (string) — A filter for commissionable deals. Restriction: This filter is currently only supported for the US marketplace.
- **delivery_country** (string) — A filter for items that can be shipped to the specified country.
- **limit** (string) — The maximum number of items, from the current result set, returned on a single page.
- **offset** (string) — The number of items that will be skipped in the result set. This is used with the limit field to control the pagination of the output.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID.

## Request Body

```
null
```

## Response Example

```
{
  "dealItems": [
    {
      "title": "Example Deal Item",
      "itemId": "123456789",
      "price": {
        "value": "10.00",
        "currency": "USD"
      }
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

Tags: deal_item
