# GET /minifig/{minifigNumber}

Get a minifig

Returns a LEGO minifigure object. The reference says some response fields may be omitted depending on the minifig state.

## Parameters

- **minifigNumber** (string) *required* — Minifigure number to look up, for example sw0509.
- **currency** (string) — Optional ISO 4217 currency code. Defaults to USD when omitted.
- **User-Agent** (header) *required* — BrickEconomy docs state that User-Agent is required on all requests.

## Request Body

```
null
```

## Response Example

```
{"data":{"minifig_number":"sw0451","name":"Han Solo","description":"Han Solo, reddish brown legs with holster pattern, vest with pockets","set_count":2,"sets":["10236-1","75003-1"],"theme":"Star Wars","year":2013,"released_date":"December 2012","current_value_new":7.27,"currency":"USD","price_events_new":[{"date":"2024-01-14","value":7.26},{"date":"2023-12-31","value":7.2}]}}
```

Tags: Minifigs
