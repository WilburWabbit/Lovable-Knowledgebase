# POST /payment_dispute/{payment_dispute_id}/accept

Accept Payment Dispute

This method is used if the seller wishes to accept a payment dispute.

## Parameters

- **payment_dispute_id** (string) *required* — This is the unique identifier of the payment dispute.

## Request Body

```
{"revision": 1, "returnAddress": {}}
```

## Response Example

```
null
```

Tags: payment_dispute
