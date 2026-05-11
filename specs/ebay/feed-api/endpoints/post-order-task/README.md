# POST /order_task

createOrderTask

This method creates an order download task with filter criteria for the order report.

## Parameters

_None_

## Request Body

```
{ "feedType": "LMS_ORDER_REPORT", "filterCriteria": { "creationDateRange": { "from": "2023-01-01T00:00:00Z", "to": "2023-01-10T00:00:00Z" }, "orderStatus": "COMPLETED" }, "schemaVersion": "1113" }
```

## Response Example

```
{}
```

Tags: order_task
