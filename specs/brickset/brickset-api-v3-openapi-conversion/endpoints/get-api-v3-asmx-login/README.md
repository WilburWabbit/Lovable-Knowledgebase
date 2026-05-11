# GET /api/v3.asmx/login

Log in and obtain a user hash.

Logs in with a Brickset username and password and returns a hash token for subsequent user-specific calls. GET is documented by the ASMX service, but POST is preferable because GET places credentials on the URL.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **username** (string) *required* — Brickset username.
- **password** (string) *required* — Brickset password. POST is recommended to avoid credentials in the URL.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "hash": "abc123hash"}
```

Tags: General
