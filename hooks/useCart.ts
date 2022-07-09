import { useAppSelector } from "@/hooks/useRedux";
import { useQuery } from "react-query";

import useCartRequest from "@/hooks/useCartRequest";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useCart() {
  const { getAuthenticatedCartRequest, getCartRequest } = useCartRequest();
  const { cart } = useAppSelector((state) => state.cart);
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);
  const baseURL = useBaseUrl();

  function useGetCart() {
    const { data, status } = useQuery(
      "getCartQuery",
      () => {
        return loginDetails === null
          ? getCartRequest(baseURL)
          : getAuthenticatedCartRequest(baseURL);
      },
      {
        enabled: !!baseURL,
      }
    );
    return [data?.data?.cart, status];
  }
  return { cart, useGetCart };
}
