# GET /sales_tax/{countryCode}/{jurisdictionId}

Get Sales Tax

Gets the current sales tax table entry for a specific jurisdiction.

## Parameters

- **countryCode** (string) *required* — Country code.
- **jurisdictionId** (string) *required* — Jurisdiction ID.

## Request Body

```
null
```

## Response Example

```
{"salesTaxPercentage": "string"}
```

Tags: sales_tax
