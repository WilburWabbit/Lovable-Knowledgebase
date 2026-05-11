# GET /task/{task_id}

getTask

This method retrieves the details and status of the specified task. The input is task_id.

## Parameters

- **task_id** (string) *required* — The ID of the task.

## Request Body

```
null
```

## Response Example

```
{ "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } }
```

Tags: task
