# GET /custom_policy/

Get Custom Policies

This method retrieves the list of custom policies specified by the policy_types query parameter for the selected eBay marketplace.

## Parameters

- **policy_types** (string) — This query parameter specifies the type of custom policies to be returned.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — This header parameter specifies the eBay marketplace for the custom policy.

## Request Body

```
null
```

## Response Example

```
{"customPolicies": [{"customPolicyId": "string", "label": "string", "name": "string", "policyType": "string"}]}
```

Tags: custom_policy
