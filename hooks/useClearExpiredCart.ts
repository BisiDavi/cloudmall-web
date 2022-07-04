/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { clearCart } from "@/redux/cart-slice";
import { clearExpiredCart } from "@/utils/cartRequest";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

export default function useClearExpiredCart() {
  const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  function clearStoredCart() {
    dispatch(clearCart());
  }

  useEffect(() => {
    if (cart.length > 0) {
      clearExpiredCart(cart[0].cartId, clearStoredCart);
    }
  }, []);
}
