# GET /api/v3.asmx/getInstructions

Get instructions for a set by set ID.

Returns instruction URLs for the specified set ID.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **setID** (integer) *required* — Internal set ID.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "instructions": [{"URL": "https://example.com/manual.pdf"}]}
```

Tags: Sets
