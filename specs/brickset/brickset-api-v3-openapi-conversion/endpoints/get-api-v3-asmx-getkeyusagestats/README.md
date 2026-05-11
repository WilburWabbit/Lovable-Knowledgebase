# GET /api/v3.asmx/getKeyUsageStats

Get key usage stats for the last 30 days.

Brickset notes that only calls to getSets count against key usage.

## Parameters

- **apiKey** (string) *required* — Brickset API key.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "apiKeyUsage": [{"dateStamp": "2023-01-01T00:00:00Z", "count": 10}]}
```

Tags: General
