# GET /shipment/{shipmentId}/download_label_file

downloadLabelFile

This method returns the shipping label file that was generated for the shipmentId value specified in the request. Call createFromShippingQuote to generate a shipment ID. Use the Accept HTTP header to specify the format of the returned file. The default file format is a PDF file.

## Parameters

- **shipmentId** (string) *required* — This path parameter specifies the unique eBay-assigned ID of the shipment associated with the shipping label you want to download. The shipmentId value is generated and returned by a call to createFromShippingQuote.

## Request Body

```
null
```

## Response Example

```
["base64encodedPDFData"]
```

Tags: shipment
