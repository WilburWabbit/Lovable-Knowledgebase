# POST /api/v3.asmx/checkUserHash

Check whether a user hash is valid.

Verifies a userHash previously returned by login.

## Parameters

_None_

## Request Body

```
{"apiKey": "string", "userHash": "string"}
```

## Response Example

```
{"status": "success"}
```

Tags: General
