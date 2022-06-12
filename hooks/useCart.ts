import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addToCart, removeFromCart } from "@/redux/cart-slice";
import { productType } from "@/types/product-types";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  function addToCartHandler(item: any) {
    return dispatch(addToCart(item));
  }

  function removeCartHandler(cartItemID: string) {
    return dispatch(removeFromCart(cartItemID));
  }

  return { cart, addToCartHandler, removeCartHandler };
}
