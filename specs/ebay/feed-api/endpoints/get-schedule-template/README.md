# GET /schedule_template

getScheduleTemplates

This method retrieves an array containing the details and status of all schedule templates based on the specified feed_type.

## Parameters

- **feed_type** (string) *required* — The feed type of the schedule templates to retrieve.
- **limit** (string) — The maximum number of schedule templates per page.
- **offset** (string) — The number of schedule templates to skip.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "scheduleTemplates": [ { "feedType": "string", "frequency": "string", "name": "string", "scheduleTemplateId": "string", "status": "string", "supportedConfigurations": [ { "defaultValue": "string", "property": "string", "usage": "string" } ] } ], "total": 0 }
```

Tags: schedule
