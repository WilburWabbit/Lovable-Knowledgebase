# PUT /schedule/{schedule_id}

updateSchedule

This method updates an existing schedule. Specify the schedule to update using the schedule_id path parameter.

## Parameters

- **schedule_id** (string) *required* — The ID of the schedule to update.

## Request Body

```
{ "scheduleName": "Updated Name", "preferredTriggerHour": "12Z" }
```

## Response Example

```
null
```

Tags: schedule
