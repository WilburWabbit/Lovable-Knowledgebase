# GET /rate_limit/

getRateLimits

This method retrieves the call limit and utilization data for an application. The data is retrieved for all RESTful APIs and the legacy Trading API. By default, this method returns utilization data for all RESTful API and the legacy Trading API resources. Use the api_name and api_context query parameters to filter the response to only the desired APIs.

## Parameters

- **api_context** (string) — This optional query parameter filters the result to include only the specified API context. Valid values: buy, sell, commerce, developer, tradingapi
- **api_name** (string) — This optional query parameter filters the result to include only the APIs specified. Example values: browse, inventory, taxonomy, tradingapi

## Request Body

```
null
```

## Response Example

```
{"rateLimits":[{"apiContext":"buy","apiName":"browse","apiVersion":"v1","resources":[{"name":"item","rates":[{"limit":5000,"remaining":4999,"reset":"2018-08-04T07:09:00.000Z","timeWindow":86400}]}]}]}
```

Tags: rate_limit
