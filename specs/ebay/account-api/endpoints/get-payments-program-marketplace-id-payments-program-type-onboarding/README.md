# GET /payments_program/{marketplace_id}/{payments_program_type}/onboarding

Get Payments Program Onboarding Status

Retrieves a seller's onboarding status for a payments program.

## Parameters

- **marketplace_id** (string) *required* — Marketplace ID.
- **payments_program_type** (string) *required* — Program type.

## Request Body

```
null
```

## Response Example

```
{"onboardingStatus": "COMPLETE", "steps": []}
```

Tags: onboarding
