# GET /api/v3.asmx/getCollection

Get a user's collection.

Returns a user's entire collection as quickly and efficiently as possible.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **userHash** (string) *required* — User hash returned by login.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "sets": [{"setID": 1, "owned": true}]}
```

Tags: Collection
