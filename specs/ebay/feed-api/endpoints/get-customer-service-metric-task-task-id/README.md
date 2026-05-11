# GET /customer_service_metric_task/{task_id}

getCustomerServiceMetricTask

Use this method to retrieve customer service metric task details for the specified task. The input is task_id.

## Parameters

- **task_id** (string) *required* — Use this path parameter to specify the task ID value for the customer service metric task to retrieve.

## Request Body

```
null
```

## Response Example

```
{ "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "customerServiceMetricType": "string", "evaluationMarketplaceId": "string", "listingCategories": [ "string" ], "shippingRegions": [ "string" ] }, "schemaVersion": "string", "status": "string", "taskId": "string" }
```

Tags: customer_service_metric_task
