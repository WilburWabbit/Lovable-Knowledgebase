# GET /payout/{payout_Id}

Get Payout

This method retrieves details on a specific seller payout. The unique identifier of the payout is passed in as a path parameter at the end of the call URI.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — This header identifies the seller's eBay marketplace.
- **payout_Id** (string) *required* — The unique identifier of the payout.

## Request Body

```
null
```

## Response Example

```
{"payoutId": "5000000001", "payoutStatus": "SUCCEEDED", "amount": {"value": "100.00", "currency": "USD"}, "payoutDate": "2023-01-01T10:00:00.000Z", "transactionCount": 5}
```

Tags: payout
