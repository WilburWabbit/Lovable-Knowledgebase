# POST /api/v3.asmx/login

Log in and obtain a user hash.

Logs in with a Brickset username and password and returns a hash token for subsequent user-specific calls.

## Parameters

_None_

## Request Body

```
{"apiKey": "string", "username": "string", "password": "password"}
```

## Response Example

```
{"status": "success", "hash": "abc123hash"}
```

Tags: General
