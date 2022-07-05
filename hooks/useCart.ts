import { useAppSelector } from "@/hooks/useRedux";
import {
  getAuthenticatedCartRequest,
  getCartRequest,
} from "@/utils/cartRequest";
import { useQuery } from "react-query";

export default function useCart() {
  const { cart } = useAppSelector((state) => state.cart);
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);

  function useGetCart() {
    const { data, status } = useQuery("getCartQuery", () => {
      return loginDetails === null
        ? getCartRequest(cart[0]?.cartId)
        : getAuthenticatedCartRequest(loginDetails.token);
    });
    return [data?.data?.cart, status];
  }
  return { cart, useGetCart };
}
