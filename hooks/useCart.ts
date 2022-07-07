import { useAppSelector } from "@/hooks/useRedux";
import { useQuery } from "react-query";

import {
  getAuthenticatedCartRequest,
  getCartRequest,
} from "@/utils/cartRequest";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useCart() {
  const { cart } = useAppSelector((state) => state.cart);
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);
  const { baseURL } = useBaseUrl();

  function useGetCart() {
    const { data, status } = useQuery("getCartQuery", () => {
      return loginDetails === null
        ? getCartRequest(baseURL, cart[0]?.cartId)
        : getAuthenticatedCartRequest(baseURL, loginDetails.token);
    });
    return [data?.data?.cart, status];
  }
  return { cart, useGetCart };
}
