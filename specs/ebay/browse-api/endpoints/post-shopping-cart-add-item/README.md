# POST /shopping_cart/add_item

Add item to shopping cart

Creates an eBay cart (if needed) and adds items. Requires RESTful item ID.

## Parameters

_None_

## Request Body

```
{ "itemId": "v1|272394640372|0", "quantity": 1 }
```

## Response Example

```
{ "cartItems": [ { "cartItemId": "5001", "itemId": "v1|272394640372|0", "quantity": 1 } ] }
```

Tags: shopping_cart
