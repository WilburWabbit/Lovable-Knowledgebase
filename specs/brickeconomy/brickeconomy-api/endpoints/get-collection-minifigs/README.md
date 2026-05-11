# GET /collection/minifigs

Get my minifigs

Returns the authenticated user's entire minifigure collection. The reference says identical minifig numbers are returned as separate objects when they represent distinct inventory instances.

## Parameters

- **currency** (string) — Optional ISO 4217 currency code. Defaults to USD when omitted.
- **User-Agent** (header) *required* — BrickEconomy docs state that User-Agent is required on all requests.

## Request Body

```
null
```

## Response Example

```
{"data":{"minifigs_count":23,"minifigs_unique_count":22,"current_value":554.04,"currency":"USD","minifigs":[{"minifig_number":"scd003","name":"Shaggy Rogers","aquired_date":"2023-12-29","collection":"Investments","paid_price":4.91,"current_value":7.67,"growth":156.52}],"periods":[{"value":587.28,"date":"2024-01-01","minifigs_count":23}]}}
```

Tags: Collection
