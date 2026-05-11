# GET /api/v3.asmx/getAdditionalImages

Get additional images for a set.

Returns additional image URLs for the specified set.

## Parameters

- **apiKey** (string) *required* — Brickset API key.
- **setID** (integer) *required* — Internal set ID.

## Request Body

```
null
```

## Response Example

```
{"status": "success", "matches": 1, "additionalImages": [{"imageURL": "https://example.com/img.jpg"}]}
```

Tags: Sets
