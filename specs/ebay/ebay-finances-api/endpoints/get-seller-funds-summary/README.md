# GET /seller_funds_summary

Get Seller Funds Summary

This method retrieves all pending funds that have not yet been distributed through a seller payout. If there are no funds, a 204 status code is returned.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Marketplace ID header.

## Request Body

```
null, Dress example response, response_example:
```

## Response Example

```
{"availableFunds": {"value": "50.00", "currency": "USD"}, "processingFunds": {"value": "10.00", "currency": "USD"}, "onHoldFunds": {"value": "0.00", "currency": "USD"}, "totalFunds": {"value": "60.00", "currency": "USD"}}
```

Tags: seller_funds_summary
