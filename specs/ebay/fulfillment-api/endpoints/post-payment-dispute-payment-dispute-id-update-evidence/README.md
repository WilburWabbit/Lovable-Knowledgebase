# POST /payment_dispute/{payment_dispute_id}/update_evidence

Update evidence

This method is used by the seller to update an existing evidence set for a payment dispute with one or more evidence files.

## Parameters

- **payment_dispute_id** (string) *required* — This is the unique identifier of the payment dispute.

## Request Body

```
{"evidenceId": "string", "evidenceType": "string", "files": []}
```

## Response Example

```
null
```

Tags: payment_dispute
