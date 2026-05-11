# GET /order_task

getOrderTasks

This method returns the details and status for an array of order tasks based on a specified feed_type or schedule_id.

## Parameters

- **date_range** (string) — The order tasks creation date range.
- **feed_type** (string) — The feed type associated with the task.
- **limit** (string) — The maximum number of order tasks per page.
- **look_back_days** (string) — The number of previous days in which to search for tasks.
- **offset** (string) — The number of order tasks to skip.
- **schedule_id** (string) — The schedule ID associated with the order task.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "tasks": [ { "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "creationDateRange": { "from": "string", "to": "string" }, "orderStatus": "string" }, "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } } ], "total": 0 }
```

Tags: order_task
