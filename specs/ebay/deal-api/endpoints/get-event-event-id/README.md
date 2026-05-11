# GET /event/{event_id}

getEvent

This method retrieves the details for an eBay event. The result set contains detailed information associated with the specified event ID, such as applicable coupons, start and end dates, and event terms.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID.
- **event_id** (string) *required* — The unique identifier for the eBay event.

## Request Body

```
null
```

## Response Example

```
{
  "eventId": "123",
  "title": "Summer Sale",
  "startDate": "2023-06-01T00:00:00Z",
  "endDate": "2023-08-01T00:00:00Z",
  "description": "Big discounts on summer items."
}
```

Tags: event
