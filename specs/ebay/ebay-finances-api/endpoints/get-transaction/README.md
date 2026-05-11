# GET /transaction

Get Transactions

The getTransactions method allows a seller to retrieve information about one or more of their monetary transactions (SALE, REFUND, CREDIT, etc.). Numerous input filters are available.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Marketplace ID header.
- **filter** (string) — Filters such as transactionDate, transactionType, transactionStatus, buyerUsername, orderId, etc.
- **limit** (string) — Number of transactions per page. Max 1000.
- **offset** (string) — Zero-based position of the first transaction in results.
- **sort** (string) — Sorting (not yet available, defaults to descending transaction date).

## Request Body

```
null
```

## Response Example

```
{"transactions": [{"transactionId": "12345", "transactionType": "SALE", "transactionStatus": "PAYOUT", "amount": {"value": "25.00", "currency": "USD"}, "transactionDate": "2023-01-01T12:00:00.000Z"}], "total": 1, "limit": 20, "offset": 0}
```

Tags: transaction
