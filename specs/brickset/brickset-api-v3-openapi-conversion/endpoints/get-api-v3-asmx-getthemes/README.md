# GET /api/v3.asmx/getThemes

Get theme summaries.

Returns themes with their total number of sets and active years.

## Parameters

- **apiKey** (string) *required* — Brickset API key.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "themes": [{"theme": "Space", "setCount": 100}]}
```

Tags: Sets
