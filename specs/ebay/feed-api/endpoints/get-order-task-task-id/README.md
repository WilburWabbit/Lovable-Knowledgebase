# GET /order_task/{task_id}

getOrderTask

This method retrieves the task details and status of the specified task. The input is task_id.

## Parameters

- **task_id** (string) *required* — The ID of the task.

## Request Body

```
null
```

## Response Example

```
{ "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "creationDateRange": { "from": "string", "to": "string" }, "orderStatus": "string" }, "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } }
```

Tags: order_task
