import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import useToast from "@/hooks/useToast";
import { useRef } from "react";
import useCart from "./useCart";
import { productType } from "@/types/product-types";

export default function useMutationAction() {
  const queryClient = useQueryClient();
  const { loadingToast, updateToast } = useToast();
  const { addToCartHandler , cart} = useCart();

  function useCartActions() {
    const toastID = useRef(null);

    return useMutation(
      (product: productType): any => addToCartHandler(product),
      {
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, "product added to cart");
        },
        onError: () => {
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            "error adding product to cart"
          );
        },
      }
    );
  }

  return { useCartActions, cart };
}
