# GET /collection/sets

Get my sets

Returns the authenticated user's entire set collection. The reference says identical set numbers are returned as separate objects when they represent distinct inventory instances.

## Parameters

- **currency** (string) — Optional ISO 4217 currency code. Defaults to USD when omitted.
- **User-Agent** (header) *required* — BrickEconomy docs state that User-Agent is required on all requests.

## Request Body

```
null
```

## Response Example

```
{"data":{"sets_count":828,"sets_unique_count":625,"sets_new_count":726,"sets_used_count":102,"sets_pieces_count":581548,"sets_minifigs_count":2591,"current_value":101124.68,"currency":"USD","sets":[{"retired":true,"set_number":"75144-1","name":"Snowspeeder","theme":"Star Wars","subtheme":"Ultimate Collector Series","year":2017,"pieces_count":1703,"minifigs_count":2,"retail_price":199.99,"released_date":"2017-01-01","retired_date":"2019-01-01","aquired_date":"2018-11-01","collection":"Investments","condition":"new","paid_price":199.99,"current_value":382.0,"growth":91.01}],"periods":[{"value":102554.69,"date":"2024-01-25","sets_count":828,"sets_count_new":740,"sets_count_used":88}]}}
```

Tags: Collection
