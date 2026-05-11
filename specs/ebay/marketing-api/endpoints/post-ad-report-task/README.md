# POST /ad_report_task

Create Report Task

Creates a report task to generate a Promoted Listings report based on specified criteria.

## Parameters

_None_

## Request Body

```
{"reportType": "CAMPAIGN_PERFORMANCE_REPORT", "dateFrom": "2023-01-01T00:00:00Z", "dateTo": "2023-01-31T00:00:00Z", "marketplaceId": "EBAY_US", "reportFormat": "TSV_GZIP", "metricKeys": ["impressions", "clicks"]}
```

## Response Example

```
{}
```

Tags: ad_report_task
