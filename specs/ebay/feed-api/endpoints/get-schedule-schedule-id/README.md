# GET /schedule/{schedule_id}

getSchedule

This method retrieves schedule details and status of the specified schedule. Specify the schedule to retrieve using the schedule_id.

## Parameters

- **schedule_id** (string) *required* — The ID of the schedule for which to retrieve the details.

## Request Body

```
null,response_example:
```

## Response Example

```
{ "creationDate": "string", "feedType": "string", "lastModifiedDate": "string", "preferredTriggerDayOfMonth": 0, "preferredTriggerDayOfWeek": "string", "preferredTriggerHour": "string", "scheduleEndDate": "string", "scheduleId": "string", "scheduleName": "string", "scheduleStartDate": "string", "scheduleTemplateId": "string", "schemaVersion": "string", "status": "string", "statusReason": "string" }
```

Tags: schedule
