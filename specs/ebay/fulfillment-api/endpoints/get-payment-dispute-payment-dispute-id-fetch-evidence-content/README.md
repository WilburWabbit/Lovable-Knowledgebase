# GET /payment_dispute/{payment_dispute_id}/fetch_evidence_content

Get Payment Dispute Evidence File

This call retrieves a specific evidence file for a payment dispute.

## Parameters

- **payment_dispute_id** (string) *required* — The identifier of the payment dispute.
- **evidence_id** (string) *required* — The identifier of the evidential file set.
- **file_id** (string) *required* — The identifier of an evidential file.

## Request Body

```
null
```

## Response Example

```
["binary content"]
```

Tags: payment_dispute
