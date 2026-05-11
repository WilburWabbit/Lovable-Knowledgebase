# GET /salesledger

Get my sales ledger

Returns the authenticated user's sales ledger. The docs say sale values use the currency of record for each entry, rather than a request-wide conversion currency.

## Parameters

- **User-Agent** (header) *required* — BrickEconomy docs state that User-Agent is required on all requests.

## Request Body

```
null
```

## Response Example

```
{"data":{"set_sales_count":6,"minifig_sales_count":1,"set_sales":[{"set_number":"10292-1","name":"The Friends Apartments","theme":"Icons","year":2021,"pieces_count":2048,"minifigs_count":7,"currency":"USD","sale_price_total":84.0,"sale_price_unit":78.0,"sale_price_shipping":5.0,"sale_price_fees":5.0,"sale_quantity":1,"sale_condition":"new","sale_date":"2021-03-03","buy_date":"2020-01-01","buy_condition":"new","buy_price":78.0}],"minifig_sales":[{"minifig_number":"sw0451","name":"Han Solo","currency":"USD","sale_price_total":64.0,"sale_price_unit":58.0,"sale_price_shipping":5.0,"sale_price_fees":5.0,"sale_quantity":10,"sale_date":"2021-03-03","buy_date":"2020-01-01","buy_price":38.0}]}}
```

Tags: Sales Ledger
