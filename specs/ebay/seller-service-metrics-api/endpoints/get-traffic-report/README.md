# GET /traffic_report

Get Traffic Report Sync

Returns a report detailing user traffic received by a seller's listings, including impressions, clicks, and sales conversion rates.

## Parameters

- **dimension** (string) — Dimension applied to report (DAY or LISTING)
- **filter** (string) — Filters for marketplace_ids, date_range, listing_ids, traffic_source
- **metric** (string) — Comma-separated list of metrics (e.g., CLICK_THROUGH_RATE, TRANSACTION)
- **sort** (string) — Metric to sort by (e.g., -CLICK_THROUGH_RATE)

## Request Body

```
null
```

## Response Example

```
{
  "startDate": "2023-09-01T00:00:00.000Z",
  "endDate": "2023-09-30T23:59:59.000Z",
  "lastUpdatedDate": "2023-10-01T12:00:00.000Z",
  "header": {
    "dimensionKeys": [{"key": "DAY", "localizedName": "Day", "dataType": "DATE"}],
    "metrics": [{"key": "TRANSACTION", "localizedName": "Transactions", "dataType": "NUMBER"}]
  },
  "records": [
    {
      "dimensionValues": [{"value": "2023-09-15", "applicable": true}],
      "metricValues": [{"value": "5", "applicable": true}]
    }
  ]
}
```

Tags: traffic_report
