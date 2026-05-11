# GET /schedule

getSchedules

This method retrieves an array containing the details and status of all schedules based on the specified feed_type.

## Parameters

- **feed_type** (string) *required* — The feedType associated with the schedule.
- **limit** (string) — The maximum number of schedules per page.
- **offset** (string) — The number of schedules to skip.

## Request Body

```
null
```

## Response Example

```
{ "href": "string", "limit": 0, "next": "string", "offset": 0, "prev": "string", "schedules": [ { "creationDate": "string", "feedType": "string", "lastModifiedDate": "string", "preferredTriggerDayOfMonth": 0, "preferredTriggerDayOfWeek": "string", "preferredTriggerHour": "string", "scheduleEndDate": "string", "scheduleId": "string", "scheduleName": "string", "scheduleStartDate": "string", "scheduleTemplateId": "string", "schemaVersion": "string", "status": "string", "statusReason": "string" } ], "total": 0 }
```

Tags: schedule
