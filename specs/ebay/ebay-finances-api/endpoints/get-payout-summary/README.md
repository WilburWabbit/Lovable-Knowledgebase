# GET /payout_summary

Get Payout Summary

This method is used to retrieve cumulative values for payouts in a particular state, or all states. The metadata in the response includes total payouts, the total number of monetary transactions, and the total dollar value of all payouts.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Marketplace ID header.
- **filter** (string) — Filter by payoutDate and/or payoutStatus.

## Request Body

```
null
```

## Response Example

```
{"payoutCount": 10, "transactionCount": 50, "amount": {"value": "1200.50", "currency": "USD"}}
```

Tags: payout
