# GET /payments_program/{marketplace_id}/{payments_program_type}

Get Payments Program Status

Returns whether or not the user is opted-in to the specified payments program.

## Parameters

- **marketplace_id** (string) *required* — Marketplace ID.
- **payments_program_type** (string) *required* — Program type.

## Request Body

```
null
```

## Response Example

```
{"status": "OPTED_IN", "marketplaceId": "string"}
```

Tags: payments_program
