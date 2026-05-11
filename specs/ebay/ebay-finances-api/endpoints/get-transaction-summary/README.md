# GET /transaction_summary

Get Transaction Summary

The getTransactionSummary method retrieves cumulative information for monetary transactions, including count and amount of sales, credits, and refunds.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Marketplace ID header.
- **filter** (string) — Filters for transactionStatus (mandatory), transactionDate, transactionType, etc.

## Request Body

```
null
```

## Response Example

```
{"creditCount": 100, "creditAmount": {"value": "2500.00", "currency": "USD"}, "refundCount": 2, "refundAmount": {"value": "45.00", "currency": "USD"}}
```

Tags: transaction
