import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { checkoutUserRequest } from "@/utils/cartRequest";
import { checkoutDetailsType } from "@/types/cart-type";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const toastID = useRef(null);

  const { loadingToast, updateToast } = useToast();

  function useCheckoutUser() {
    return useMutation(
      ({
        address,
        paymentMethod,
        note,
        instantDelivery,
        eta,
        voucher,
      }: checkoutDetailsType) =>
        checkoutUserRequest({
          address,
          paymentMethod,
          note,
          instantDelivery,
          eta,
          voucher,
        }),
      {
        mutationKey: "useCheckoutUser",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("getCartQuery");
        },
        onSuccess: (response: any) => {
          console.log("response", response);
          updateToast(toastID, "success", response.data.message);
        },
        onError: (err: any) => {
          console.log("err", err);
          updateToast(toastID, "error", err?.response?.data?.message);
        },
      }
    );
  }

  return { useCheckoutUser };
}
