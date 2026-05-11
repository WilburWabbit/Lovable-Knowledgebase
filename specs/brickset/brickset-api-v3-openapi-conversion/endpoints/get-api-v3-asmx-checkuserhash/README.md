# GET /api/v3.asmx/checkUserHash

Check whether a user hash is valid.

Verifies a userHash previously returned by login.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **userHash** (string) *required* — User hash returned by login.

## Request Body

```
null
```

## Response Example

```
{"status": "success"}
```

Tags: General
