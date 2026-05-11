# POST /suppress_listing_violation

Suppress Violation

This call suppresses a listing violation for a specific listing. Only listing violations in the AT_RISK state (returned in the violations.complianceState field of the getListingViolations call) can be suppressed. Note: At this time, the suppressViolation call only supports the suppressing of ASPECTS_ADOPTION listing violations in the AT_RISK state. In the future, it is possible that this method can be used to suppress other listing violation types. A successful call returns a http status code of 204 Success. There is no response payload. If the call is not successful, an error code will be returned stating the issue.

## Parameters

_None_

## Request Body

```
{
  "complianceType": "ASPECTS_ADOPTION",
  "listingId": "1234567890"
}
```

## Response Example

```
null
```

Tags: listing_violation
