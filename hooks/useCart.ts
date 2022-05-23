import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addToCart } from "@/redux/cart-slice";
import { productType } from "@/types/product-types";

export default function useCart() {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  function addToCartHandler(item: productType) {
    return dispatch(addToCart(item));
  }
  return { cart, addToCartHandler };
}
