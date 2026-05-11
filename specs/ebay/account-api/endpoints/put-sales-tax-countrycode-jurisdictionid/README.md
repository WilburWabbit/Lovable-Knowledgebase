# PUT /sales_tax/{countryCode}/{jurisdictionId}

Create or Replace Sales Tax

Creates or updates a sales tax table entry.

## Parameters

- **countryCode** (string) *required* — Country code.
- **jurisdictionId** (string) *required* — Jurisdiction ID.

## Request Body

```
{"salesTaxPercentage": "string", "shippingAndHandlingTaxed": false}
```

## Response Example

```
null
```

Tags: sales_tax
