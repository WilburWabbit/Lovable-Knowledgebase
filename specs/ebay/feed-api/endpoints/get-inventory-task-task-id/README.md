# GET /inventory_task/{task_id}

getInventoryTask

This method retrieves the task details and status of the specified inventory-related task. The input is task_id.

## Parameters

- **task_id** (string) *required* — The ID of the task.

## Request Body

```
null
```

## Response Example

```
{ "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "listingFormat": "string" }, "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } }
```

Tags: inventory_task
