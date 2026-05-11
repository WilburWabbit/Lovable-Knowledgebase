# POST /order/{order_id}/issue_refund

Issue Refund

This method allows a seller to issue a full or partial refund to a buyer for an order. Full or partial refunds can be issued at the order level or line item level.

## Parameters

- **order_id** (string) *required* — The unique identifier of the order.

## Request Body

```
{"reasonForRefund": "string", "comment": "string", "orderLevelRefundAmount": {"value": "10.00", "currency": "USD"}}
```

## Response Example

```
{"refundId": "string", "refundStatus": "PENDING"}
```

Tags: order
