# GET /api/v3.asmx/getSets

Retrieve sets matching search criteria.

Retrieves a list of sets, or more information about a particular one. params must be a JSON string shaped like GetSetsParamsObject. userHash is optional and is only used with user-specific filters such as owned or wanted.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **userHash** (string) — Optional user hash; used with user-specific filters such as owned or wanted.
- **params** (string) *required* — JSON-encoded parameter object. Stringify an object shaped like GetSetsParamsObject.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "sets": [{"setID": 1, "name": "Classic Space"}]}
```

Tags: Sets
