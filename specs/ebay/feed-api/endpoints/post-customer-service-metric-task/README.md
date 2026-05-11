# POST /customer_service_metric_task

createCustomerServiceMetricTask

Use this method to create a customer service metrics download task with filter criteria for the customer service metrics report.

## Parameters

- **accept-language** (string) *required* — Use this header to specify the natural language in which the authenticated user desires the response.

## Request Body

```
{ "feedType": "CUSTOMER_SERVICE_METRICS_REPORT", "filterCriteria": { "customerServiceMetricType": "ITEM_NOT_RECEIVED", "evaluationMarketplaceId": "EBAY_US", "listingCategories": ["1234"], "shippingRegions": ["DOMESTIC"] }, "schemaVersion": "1.0" }
```

## Response Example

```
{}
```

Tags: customer_service_metric_task
