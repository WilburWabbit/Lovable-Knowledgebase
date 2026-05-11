# GET /payment_dispute_summary

Search Payment Dispute by Filters

This method is used retrieve one or more payment disputes filed against the seller.

## Parameters

- **order_id** (string) — This filter is used if the seller wishes to retrieve one or more payment disputes filed against a specific order.
- **buyer_username** (string) — This filter is used if the seller wishes to retrieve one or more payment disputes opened by a specific seller.
- **open_date_from** (string) — The beginning date of the date range.
- **open_date_to** (string) — The ending date of the date range.
- **payment_dispute_status** (string) — Filter by payment dispute state.
- **limit** (string) — Maximum number of payment disputes per page.
- **offset** (string) — Number of records to skip.

## Request Body

```
null
```

## Response Example

```
{"total": 1, "paymentDisputeSummaries": []}
```

Tags: payment_dispute
