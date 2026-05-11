# GET /custom_policy/{custom_policy_id}

Get Custom Policy

This method retrieves the custom policy specified by the custom_policy_id path parameter.

## Parameters

- **custom_policy_id** (string) *required* — Unique custom policy identifier.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — eBay marketplace header.

## Request Body

```
null
```

## Response Example

```
{"customPolicyId": "string", "description": "string", "label": "string", "name": "string", "policyType": "string"}
```

Tags: custom_policy
