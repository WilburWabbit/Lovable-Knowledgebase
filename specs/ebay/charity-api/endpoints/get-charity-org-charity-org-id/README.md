# GET /charity_org/{charity_org_id}

Retrieve a charitable organization by ID

This call is used to retrieve detailed information about supported charitable organizations. It allows users to retrieve the details for a specific charitable organization using its charity organization ID.

## Parameters

- **charity_org_id** (string) *required* — The unique ID of the charitable organization.
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — A header used to specify the eBay marketplace ID. Valid Values: EBAY_GB and EBAY_US

## Request Body

```
null
```

## Response Example

```
{
  "charityOrgId": "12345",
  "name": "Example Charity",
  "description": "A detailed description of the charity.",
  "missionStatement": "Our mission is to make a difference.",
  "registrationId": "12-3456789",
  "location": {
    "address": {
      "city": "San Jose",
      "stateOrProvince": "CA",
      "postalCode": "95125",
      "country": "US"
    },
    "geoCoordinates": {
      "latitude": 37.3382,
      "longitude": -121.8863
    }
  },
  "website": "https://www.example.org",
  "logoImage": {
    "imageUrl": "https://www.example.org/logo.png",
    "height": "200",
    "width": "200"
  }
}
```

Tags: charity_org
