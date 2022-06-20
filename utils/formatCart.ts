import { cartType, formattedCartType } from "@/types/cart-type";

export default function formatCart(cart: cartType) {
  let cartObj = {} as formattedCartType;
  cartObj.cartId = cart._id;
  cartObj.items = [];
  cart.items.map((item) => {
    cartObj.items = [
      ...cartObj.items,
      {
        productId: item.product._id,
        qty: item.qty,
        storeId: item.store._id,
        itemId: item._id,
      },
    ];
  });
  return cartObj;
}
