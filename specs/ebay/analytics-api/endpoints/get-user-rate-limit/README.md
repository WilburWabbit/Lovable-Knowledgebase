# GET /user_rate_limit/

getUserRateLimits

This method retrieves the call limit and utilization data for an application user. The call-limit data is returned for all RESTful APIs and the legacy Trading API that limit calls on a per-user basis. By default, this method returns utilization data for all RESTful APIs resources and the legacy Trading API calls that limit request access by user. Use the api_name and api_context query parameters to filter the response to only the desired APIs.

## Parameters

- **api_context** (string) — This optional query parameter filters the result to include only the specified API context. Valid values: buy, sell, commerce, developer, tradingapi
- **api_name** (string) — This optional query parameter filters the result to include only the APIs specified. Example values: browse, inventory, taxonomy, tradingapi

## Request Body

```
null
```

## Response Example

```
{"rateLimits":[{"apiContext":"sell","apiName":"inventory","apiVersion":"v1","resources":[{"name":"getInventoryItem","rates":[{"limit":2000,"remaining":1950,"reset":"2018-08-04T07:09:00.000Z","timeWindow":86400}]}]}]}
```

Tags: user_rate_limit
