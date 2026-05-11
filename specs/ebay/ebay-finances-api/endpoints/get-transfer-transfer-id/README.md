# GET /transfer/{transfer_Id}

Get Transfer

This method retrieves detailed information regarding a TRANSFER transaction type, which involve a seller transferring money to eBay for reimbursement.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Marketplace ID header.
- **transfer_Id** (string) *required* — The unique identifier of the TRANSFER transaction.

## Request Body

```
null
```

## Response Example

```
{"transferId": "98765", "transferAmount": {"value": "15.00", "currency": "USD"}, "transactionDate": "2023-01-01T08:00:00.000Z", "fundingSource": {"type": "AVAILABLE_FUNDS"}}
```

Tags: transfer
