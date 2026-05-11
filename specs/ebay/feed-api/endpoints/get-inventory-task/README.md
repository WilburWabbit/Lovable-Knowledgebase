# GET /inventory_task

getInventoryTasks

This method searches for multiple tasks of a specific feed type, and includes date filters and pagination.

## Parameters

- **feed_type** (string) — The feed type associated with the inventory task.
- **schedule_id** (string) — The ID of the schedule for which to retrieve the latest result file.
- **look_back_days** (string) — The number of previous days in which to search for tasks.Default: 7.
- **date_range** (string) — Specifies the range of task creation dates used to filter the results.
- **limit** (string) — The maximum number of tasks that can be returned on each page.
- **offset** (string) — The number of tasks to skip in the result set.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "tasks": [ { "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "filterCriteria": { "listingFormat": "string" }, "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } } ], "total": 0 }
```

Tags: inventory_task
