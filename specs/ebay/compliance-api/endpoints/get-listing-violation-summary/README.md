# GET /listing_violation_summary

Get Listing Violations Summary

This call returns listing violation counts for a seller. A user can pass in one or more compliance types through the compliance_type query parameter. See ComplianceTypeEnum for more information on the supported listing compliance types. Listing violations are returned for multiple marketplaces if the seller sells on multiple eBay marketplaces. Note: Only a canned response, with counts for all listing compliance types, is returned in the Sandbox environment. Due to this limitation, the compliance_type query parameter (if used) will not have an effect on the response.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) — Use this header to specify the eBay marketplace identifier. Supported values for this header can be found in the MarketplaceIdEnum type definition. Note that Version 1.4.0 of the Compliance API is only supported on the US, UK, Australia, Canada {English), and Germany sites.
- **compliance_type** (string) — A user passes in one or more compliance type values through this query parameter. See ComplianceTypeEnum for more information on the supported compliance types that can be passed in here. If more than one compliance type value is used, delimit these values with a comma. If no compliance type values are passed in, the listing count for all compliance types will be returned. Note: Only a canned response, with counts for all listing compliance types, is returned in the Sandbox environment. Due to this limitation, the compliance_type query parameter (if used) will not have an effect on the response.

## Request Body

```
null
```

## Response Example

```
{
  "violationSummaries": [
    {
      "complianceType": "ASPECTS_ADOPTION",
      "listingCount": 5,
      "marketplaceId": "EBAY_US"
    }
  ]
}
```

Tags: listing_violation_summary
