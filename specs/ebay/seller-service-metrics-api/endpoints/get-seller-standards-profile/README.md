# GET /seller_standards_profile

Find Seller Standards Profiles

This call retrieves all the standards profiles (performance ratings like TOP_RATED) for the associated seller across different programs and cycles.

## Parameters

_None_

## Request Body

```
null
```

## Response Example

```
{
  "standardsProfiles": [
    {
      "program": "PROGRAM_US",
      "standardsLevel": "TOP_RATED",
      "defaultProgram": true,
      "cycle": {
        "cycleType": "CURRENT",
        "evaluationMonth": "2023-10"
      }
    }
  ]
}
```

Tags: seller_standards_profile
