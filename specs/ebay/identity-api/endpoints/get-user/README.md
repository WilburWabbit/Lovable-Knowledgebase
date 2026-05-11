# GET /user/

getUser

This method retrieves the account profile information for an authenticated user, which requires a User access token. What is returned is controlled by the scopes. For a business account you use the default scope commerce.identity.readonly, which returns all the fields in the businessAccount container. These are returned because this is all public information. For an individual account, the fields returned in the individualAccount container are based on the scope you use. Using the default scope, only public information, such as eBay user ID, are returned. For details about what each scope returns, see the Identity API Overview. URLs for this method Production URL: https://apiz.ebay.com/commerce/identity/v1/user/ Sandbox URL: https://apiz.sandbox.ebay.com/commerce/identity/v1/user/ In the Sandbox, this method returns mock data. Note: You must use the correct scope or scopes for the data you want returned.

## Parameters

_None_

## Request Body

```
null
```

## Response Example

```
{
  "accountType": "INDIVIDUAL",
  "businessAccount": {
    "address": {
      "addressLine1": "2065 Hamilton Ave",
      "addressLine2": "Suite 100",
      "city": "San Jose",
      "country": "US",
      "county": "Santa Clara",
      "postalCode": "95125",
      "stateOrProvince": "CA"
    },
    "doingBusinessAs": "eBay Store",
    "email": "business@example.com",
    "name": "eBay Inc",
    "primaryContact": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "primaryPhone": {
      "countryCode": "US",
      "number": "408-555-1212",
      "phoneType": "LAND_LINE"
    },
    "secondaryPhone": {
      "countryCode": "US",
      "number": "408-555-1213",
      "phoneType": "MOBILE"
    },
    "website": "https://www.ebay.com"
  },
  "individualAccount": {
    "email": "user@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "primaryPhone": {
      "countryCode": "US",
      "number": "408-555-0000",
      "phoneType": "MOBILE"
    },
    "registrationAddress": {
      "addressLine1": "123 Main St",
      "city": "San Jose",
      "country": "US",
      "postalCode": "95125",
      "stateOrProvince": "CA"
    }
  },
  "registrationMarketplaceId": "EBAY_US",
  "status": "CONFIRMED",
  "userId": "123456789",
  "username": "ebay_user_1"
}
```

Tags: user
