# POST /item_draft/

Create Item Draft

This call gives Partners the ability to create an eBay draft of a item for their seller using information from their site. This lets the Partner increase the exposure of items on their site and leverage the eBay user listing experience seamlessly. After the listing draft is created, the seller logs into their eBay account and uses the listing experience to finish the listing and publish the item on eBay.

## Parameters

- **Content-Language** (string) — Use this header to specify the natural language of the seller. Required: For EBAY_CA in French. (Content-Language = fr-CA)
- **X-EBAY-C-MARKETPLACE-ID** (string) *required* — Use this header to specify an eBay marketplace ID. For a list of supported sites, see API Restrictions in the Listing API overview.

## Request Body

```
{"categoryId": "string", "charity": {"charityId": "string", "donationPercentage": "string"}, "condition": "NEW", "format": "FIXED_PRICE", "pricingSummary": {"auctionReservePrice": {"currency": "USD", "value": "100.00"}, "auctionStartPrice": {"currency": "USD", "value": "10.00"}, "price": {"currency": "USD", "value": "150.00"}}, "product": {"aspects": [{"name": "Brand", "values": ["Nike"]}], "brand": "Nike", "description": "Item description", "epid": "string", "imageUrls": ["https://example.com/image.jpg"], "title": "Nike Shoes"}}
```

## Response Example

```
{"itemDraftId": "v1|1234567890|0", "sellFlowNativeUri": "ebay://launch?itemDraftId=123", "sellFlowUrl": "https://bulksell.ebay.com/ws/eBayISAPI.dll?SingleList&itemDraftId=123"}
```

Tags: item_draft
