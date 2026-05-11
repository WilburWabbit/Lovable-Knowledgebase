# GET /api/v3.asmx/getMinifigCollection

Get a user's minifigure collection.

Returns minifigs owned or wanted by a user. Params must be a JSON string shaped like GetMinifigCollectionParamsObject.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **userHash** (string) *required* — User hash returned by login.
- **Params** (string) *required* — JSON-encoded parameter object. Stringify an object shaped like GetMinifigCollectionParamsObject.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "minifigs": [{"minifigNumber": "sw0001", "name": "Battle Droid"}]}
```

Tags: Minifigs
