# POST /bulk_create_negative_keyword

Bulk Create Negative Keywords

Creates negative keywords in bulk for a CPC campaign.

## Parameters

_None_

## Request Body

```
{"requests": [{"campaignId": "123", "adGroupId": "456", "negativeKeywordText": "bad shoe", "negativeKeywordMatchType": "EXACT"}]}
```

## Response Example

```
{"responses": [{"negativeKeywordId": "777", "statusCode": 201}]}
```

Tags: negative_keyword
