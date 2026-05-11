# GET /task

getTasks

This method returns the details and status for an array of tasks based on a specified feed_type or scheduledId.

## Parameters

- **date_range** (string) — Specifies the range of task creation dates used to filter the results.
- **feed_type** (string) — The feed type associated with the tasks to be returned.
- **limit** (string) — The maximum number of tasks that can be returned per page.
- **look_back_days** (string) — The number of previous days in which to search for tasks.
- **offset** (string) — The number of tasks to skip in the result set.
- **schedule_id** (string) — The schedule ID associated with the task.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "tasks": [ { "completionDate": "string", "creationDate": "string", "detailHref": "string", "feedType": "string", "schemaVersion": "string", "status": "string", "taskId": "string", "uploadSummary": { "failureCount": 0, "successCount": 0 } } ], "total": 0 }
```

Tags: task
