# GET /schedule_template/{schedule_template_id}

getScheduleTemplate

This method retrieves the details of the specified template. Specify the template using the schedule_template_id.

## Parameters

- **schedule_template_id** (string) *required* — The ID of the template to retrieve.

## Request Body

```
null
```

## Response Example

```
{ "feedType": "string", "frequency": "string", "name": "string", "scheduleTemplateId": "string", "status": "string", "supportedConfigurations": [ { "defaultValue": "string", "property": "string", "usage": "string" } ] }
```

Tags: schedule
