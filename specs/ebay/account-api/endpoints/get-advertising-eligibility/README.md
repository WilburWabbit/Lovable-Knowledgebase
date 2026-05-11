# GET /advertising_eligibility

Get Advertising Eligibility

This method allows developers to check the seller eligibility status for eBay advertising programs.

## Parameters

- **program_types** (string) — A comma-separated list of eBay advertising programs.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The unique identifier of the eBay marketplace for which the seller eligibility status shall be checked.

## Request Body

```
null
```

## Response Example

```
{"advertisingEligibility": [{"programType": "string", "reason": "string", "status": "string"}]}
```

Tags: advertising_eligibility
