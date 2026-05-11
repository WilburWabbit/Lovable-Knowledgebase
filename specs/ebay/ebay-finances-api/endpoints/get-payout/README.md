# GET /payout

Get Payouts

This method is used to retrieve the details of one or more seller payouts. By using the filter query parameter, users can retrieve payouts processed within a specific date range, and/or they can retrieve payouts in a specific state. There are also pagination and sort query parameters that allow users to control the payouts that are returned in the response. If no payouts match the input criteria, an empty payload is returned.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — This header identifies the seller's eBay marketplace. It is required for all marketplaces outside of the US.
- **filter** (string) — Filter payouts by payoutDate, lastAttemptedPayoutDate, or payoutStatus.
- **limit** (string) — The number of payouts to return per page. Max 200.
- **offset** (string) — The actual position that the first payout returned on the current page has in the results set.
- **sort** (string) — Sort order for payouts (payoutDate or lastAttemptedPayoutDate).

## Request Body

```
null
```

## Response Example

```
{"payouts": [{"payoutId": "5000000001", "payoutStatus": "SUCCEEDED", "amount": {"value": "100.00", "currency": "USD"}, "payoutDate": "2023-01-01T10:00:00.000Z", "transactionCount": 1}], "total": 1, "limit": 20, "offset": 0}
```

Tags: payout
