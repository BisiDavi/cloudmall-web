import { useAppSelector } from "@/hooks/useRedux";
import { getCartRequest } from "@/utils/cartRequest";
import { useQuery } from "react-query";

export default function useCart() {
  const { cart } = useAppSelector((state) => state.cart);

  function useGetCart() {
    const { data, status } = useQuery("getCartQuery", () =>
      getCartRequest(cart[0]?.cartId)
    );
    return [data?.data?.cart, status];
  }

  return { cart, useGetCart };
}
