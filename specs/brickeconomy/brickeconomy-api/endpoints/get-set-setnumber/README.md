# GET /set/{setNumber}

Get a set

Returns a LEGO set object. The reference says some response fields may be omitted depending on the set state.

## Parameters

- **setNumber** (string) *required* — Set number to look up. Examples include 10236 and 10236-1. If a set has multiple variations, include the variation suffix such as -1.
- **currency** (string) — Optional ISO 4217 currency code. Defaults to USD when omitted.
- **User-Agent** (header) *required* — BrickEconomy docs state that User-Agent is required on all requests.

## Request Body

```
null
```

## Response Example

```
{"data":{"retired":true,"set_number":"10236-1","name":"Ewok Village","theme":"Star Wars","subtheme":"Ultimate Collector Series","year":2013,"pieces_count":1990,"minifigs_count":17,"availability":"exclusive","released_date":"2013-09-01","retired_date":"2016-11-29","current_value_new":604.61,"current_value_used":519.99,"currency":"USD","price_events_new":[{"date":"2024-01-14","value":604.61},{"date":"2023-12-31","value":627.74}]}}
```

Tags: Sets
