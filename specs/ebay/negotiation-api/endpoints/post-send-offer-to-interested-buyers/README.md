# POST /send_offer_to_interested_buyers

sendOfferToInterestedBuyers

This method sends eligible buyers offers to purchase items in a listing at a discount. Sellers use findEligibleItems to get the set of listings that have interested buyers and then use this method to send the offer.

## Parameters

- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — The eBay marketplace on which your listings with 'eligible' buyers appear.

## Request Body

```
{
  "allowCounterOffer": false,
  "message": "Special offer for you!",
  "offerDuration": {
    "unit": "DAY",
    "value": 2
  },
  "offeredItems": [
    {
      "listingId": "123456789012",
      "discountPercentage": "10.0",
      "quantity": 1
    }
  ]
}
```

## Response Example

```
{
  "offers": [
    {
      "allowCounterOffer": false,
      "creationDate": "2023-10-01T10:00:00.000Z",
      "initiatedBy": "seller_user",
      "lastModifiedDate": "2023-10-01T10:00:00.000Z",
      "message": "Special offer for you!",
      "offerDuration": {
        "unit": "DAY",
        "value": 2
      },
      "offerId": "555123",
      "offerStatus": "PENDING",
      "offerType": "OFFER_TO_BUYER",
      "offeredItems": [
        {
          "listingId": "123456789012",
          "discountPercentage": "10.0",
          "quantity": 1
        }
      ],
      "revision": "1"
    }
  ]
}
```

Tags: offer
