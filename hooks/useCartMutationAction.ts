import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import useToast from "@/hooks/useToast";
import { useRef } from "react";
import useCart from "./useCart";
import { productType } from "@/types/product-types";

export default function useCartMutationAction() {
  const queryClient = useQueryClient();
  const { loadingToast, updateToast } = useToast();
  const { addToCartHandler, cart, removeCartHandler } = useCart();

  function useAddToCart() {
    const toastID = useRef(null);

    return useMutation(
      (product: productType): any => {
        console.log("product", product);
        addToCartHandler(product);
      },
      {
        mutationKey: "addProductToCart",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, "product added to cart");
        },
        onError: (err) => {
          console.log("err", err);
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            "error adding product to cart"
          );
        },
      }
    );
  }

  function useRemoveCartItem() {
    const toastID = useRef(null);

    return useMutation(
      (productName: string): any => {
        console.log("productName", productName);
        removeCartHandler(productName);
      },
      {
        mutationKey: "removeProducfromCart",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: () => {
          updateToast(toastID, toast.TYPE.SUCCESS, "product removed from cart");
        },
        onError: (err) => {
          console.log("err", err);
          updateToast(
            toastID,
            toast.TYPE.ERROR,
            "error removing product from cart"
          );
        },
      }
    );
  }

  return { useAddToCart, useRemoveCartItem, cart };
}
