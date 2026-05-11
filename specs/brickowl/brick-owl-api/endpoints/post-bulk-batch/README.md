# POST /bulk/batch

Batch requests

Batch up to 50 requests into one bulk request to reduce request overhead.

## Parameters

_None_

## Request Body

```
{"key": "YOUR_API_KEY", "requests": "{\"requests\":[{\"endpoint\":\"catalog/search\",\"request_method\":\"GET\",\"params\":[{\"query\":\"Vendor\"}]}]}"}
```

## Response Example

```
{}
```

Tags: Bulk
