# GET /charity_org

Search for charitable organizations

This call is used to search for supported charitable organizations. It allows users to search for a specific charitable organization, or for multiple charitable organizations, from a particular charitable domain and/or geographical region, or by using search criteria. The call returns paginated search results containing the charitable organizations that match the specified criteria.

## Parameters

- **limit** (string) — The number of items, from the result set, returned in a single page. Valid Values: 1-100. Default: 20
- **offset** (string) — The number of items that will be skipped in the result set. This is used with the limit field to control the pagination of the output. Valid Values: 0-10,000. Default: 0
- **q** (string) — A query string that matches the keywords in name, mission statement, or description.
- **registration_ids** (string) — A comma-separated list of charitable organization registration IDs. Note: Do not specify this parameter for query-based searches. Specify either the q or registration_ids parameter, but not both. Maximum Limit: 20
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID. Valid Values: EBAY_GB and EBAY_US

## Request Body

```
null
```

## Response Example

```
{
  "charityOrgs": [
    {
      "charityOrgId": "12345",
      "name": "Example Charity",
      "missionStatement": "Helping people in need.",
      "registrationId": "12-3456789",
      "location": {
        "address": {
          "city": "San Jose",
          "stateOrProvince": "CA",
          "postalCode": "95125",
          "country": "US"
        }
      },
      "website": "https://www.example.org",
      "logoImage": {
        "imageUrl": "https://www.example.org/logo.png",
        "height": "100",
        "width": "100"
      }
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0,
  "href": "/charity_org?q=example"
}
```

Tags: charity_org
