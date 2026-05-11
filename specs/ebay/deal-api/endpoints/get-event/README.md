# GET /event

getEvents

This method returns paginated results containing all eBay events for the specified marketplace.

## Parameters

- **limit** (string) — The maximum number of items, from the current result set, returned on a single page. Default: 20 Maximum Value: 100
- **offset** (string) — The number of items that will be skipped in the result set. This is used with the limit field to control the pagination of the output.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID.

## Request Body

```
null
```

## Response Example

```
{
  "events": [
    {
      "eventId": "123",
      "title": "Summer Sale",
      "startDate": "2023-06-01T00:00:00Z"
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

Tags: event
