# GET /event_item

getEventItems

This method returns a paginated set of event items. The result set contains all event items associated with the specified search criteria and marketplace ID.

## Parameters

- **category_ids** (string) — The unique identifier of the eBay category for the search. Maximum Value: 1
- **delivery_country** (string) — A filter for items that can be shipped to the specified country.
- **event_ids** (string) *required* — The unique identifiers for the eBay events. Maximum Value: 1
- **limit** (string) — The maximum number of items, from the current result set, returned on a single page. Default: 20
- **offset** (string) — The number of items that will be skipped in the result set. This is used with the limit field to control the pagination of the output.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID.

## Request Body

```
null
```

## Response Example

```
{
  "eventItems": [
    {
      "title": "Example Event Item",
      "itemId": "987654321",
      "price": {
        "value": "15.00",
        "currency": "USD"
      }
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

Tags: event_item
