# POST /inventory_task

createInventoryTask

This method creates an inventory-related download task for a specified feed type with optional filter criteria.

## Parameters

_None_

## Request Body

```
{ "feedType": "LMS_ACTIVE_INVENTORY_REPORT", "filterCriteria": { "listingFormat": "AUCTION" }, "schemaVersion": "1.0" }
```

## Response Example

```
{}
```

Tags: inventory_task
