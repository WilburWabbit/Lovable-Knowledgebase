# POST /shopping_cart/update_quantity

Update item quantity in shopping cart

Updates the quantity of a specific item in the eBay member's cart.

## Parameters

_None_

## Request Body

```
{ "cartItemId": "5001", "quantity": 2 }
```

## Response Example

```
{ "cartItems": [ { "cartItemId": "5001", "quantity": 2 } ] }
```

Tags: shopping_cart
