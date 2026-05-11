# GET /payment_dispute/{payment_dispute_id}

Get Payment Dispute Details

This method retrieves detailed information on a specific payment dispute.

## Parameters

- **payment_dispute_id** (string) *required* — This is the unique identifier of the payment dispute.

## Request Body

```
null
```

## Response Example

```
{"paymentDisputeId": "string", "amount": {"value": "10.00", "currency": "USD"}}
```

Tags: payment_dispute
