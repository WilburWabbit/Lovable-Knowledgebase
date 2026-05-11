# GET /catalog/availability

Get item availability

Retrieve pricing and availability information for a catalog item by BOID.

## Parameters

- **key** (string) *required* — Brick Owl API key.
- **boid** (string) *required* — A BOID.
- **quantity** (integer) — Optional minimum required quantity.
- **country** (string) *required* — ISO2 shipping destination country code.
- **store_country** (string) — Optional ISO2 store country filter.

## Request Body

```
null
```

## Response Example

```
{}
```

Tags: Catalog
