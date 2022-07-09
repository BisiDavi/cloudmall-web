/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { clearCart } from "@/redux/cart-slice";
import useCartRequest from "@/hooks/useCartRequest";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useClearExpiredCart() {
  const { cart } = useAppSelector((state) => state.cart);
  const baseURL = useBaseUrl();
  const { clearExpiredCart } = useCartRequest();

  const dispatch = useAppDispatch();

  function clearStoredCart() {
    dispatch(clearCart());
  }

  useEffect(() => {
    if (cart.length > 0) {
      clearExpiredCart(baseURL, clearStoredCart);
    }
  }, []);
}
