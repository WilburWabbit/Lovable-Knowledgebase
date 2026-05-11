# POST /payment_dispute/{payment_dispute_id}/contest

Contest Payment Dispute

This method is used if the seller wishes to contest a payment dispute initiated by the buyer.

## Parameters

- **payment_dispute_id** (string) *required* — This is the unique identifier of the payment dispute.

## Request Body

```
{"revision": 1, "note": "string"}
```

## Response Example

```
null
```

Tags: payment_dispute
