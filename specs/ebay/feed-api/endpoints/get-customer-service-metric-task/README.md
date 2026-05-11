# GET /customer_service_metric_task

getCustomerServiceMetricTasks

Use this method to return an array of customer service metric tasks. You can limit the tasks returned by specifying a date range.

## Parameters

- **date_range** (string) — The task creation date range.
- **feed_type** (string) — The feed type associated with the task.
- **limit** (string) — The number of customer service metric tasks to return per page.
- **look_back_days** (string) — The number of previous days in which to search for tasks.
- **offset** (string) — The number of customer service metric tasks to skip.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "tasks": [ { "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "customerServiceMetricType": "string", "evaluationMarketplaceId": "string", "listingCategories": [ "string" ], "shippingRegions": [ "string" ] }, "schemaVersion": "string", "status": "string", "taskId": "string" } ], "total": 0 }
```

Tags: customer_service_metric_task
