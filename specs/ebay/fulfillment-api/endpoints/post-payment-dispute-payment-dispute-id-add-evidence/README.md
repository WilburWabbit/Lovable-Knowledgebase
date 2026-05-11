# POST /payment_dispute/{payment_dispute_id}/add_evidence

Add an Evidence File

This method is used by the seller to add one or more evidence files to address a payment dispute initiated by the buyer.

## Parameters

- **payment_dispute_id** (string) *required* — This is the unique identifier of the payment dispute.

## Request Body

```
{"evidenceType": "string", "files": [{"fileId": "string"}], "lineItems": []}
```

## Response Example

```
{"evidenceId": "string"}
```

Tags: payment_dispute
