# GET /api/v3.asmx/setCollection

Update a user's set collection details.

Updates collection data for a specific set. params must be a JSON string shaped like SetCollectionParamsObject.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **userHash** (string) *required* — User hash returned by login.
- **SetID** (integer) *required* — Internal set ID.
- **params** (string) *required* — JSON-encoded parameter object. Stringify an object shaped like SetCollectionParamsObject.

## Request Body

```
null
```

## Response Example

```
{"status": "success"}
```

Tags: Collection
