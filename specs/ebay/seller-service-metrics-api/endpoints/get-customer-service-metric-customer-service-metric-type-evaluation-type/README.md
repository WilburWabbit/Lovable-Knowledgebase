# GET /customer_service_metric/{customer_service_metric_type}/{evaluation_type}

Get Customer Service Metric

Use this method to retrieve a seller's performance and rating for the customer service metric based on type (e.g., ITEM_NOT_AS_DESCRIBED) and evaluation cycle (CURRENT or PROJECTED).

## Parameters

- **customer_service_metric_type** (string) *required* — Type of customer service metrics (ITEM_NOT_AS_DESCRIBED, ITEM_NOT_RECEIVED)
- **evaluation_type** (string) *required* — Type of evaluation (CURRENT, PROJECTED)
- **evaluation_marketplace_id** (string) *required* — Marketplace ID to evaluate (e.g., EBAY_US)

## Request Body

```
null
```

## Response Example

```
{
  "marketplaceId": "EBAY_US",
  "evaluationCycle": {
    "evaluationType": "CURRENT",
    "evaluationDate": "2023-10-20T00:00:00.000Z",
    "startDate": "2022-10-01T00:00:00.000Z",
    "endDate": "2023-09-30T00:00:00.000Z"
  },
  "dimensionMetrics": [
    {
      "dimension": {
        "dimensionKey": "LISTING_CATEGORY",
        "name": "Fashion",
        "value": "11450"
      },
      "metrics": [
        {
          "metricKey": "RATE",
          "value": "0.015",
          "benchmark": {
            "rating": "AVERAGE",
            "basis": "PEER_BENCHMARK",
            "metadata": {
              "average": "0.012"
            }
          }
        }
      ]
    }
  ]
}
```

Tags: customer_service_metric
