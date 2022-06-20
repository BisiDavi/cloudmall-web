import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { toast } from "react-toastify";

import useToast from "@/hooks/useToast";
import useCart from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addToCartRequest, updateCartRequest } from "@/utils/cartRequest";
import { addToCart } from "@/redux/cart-slice";
import formatCart from "@/utils/formatCart";
import {
  addToCartMutationType,
  updateCartMutationType,
} from "@/types/cart-type";

export default function useCartMutationAction() {
  const queryClient = useQueryClient();
  const { cart } = useAppSelector((state) => state.cart);
  const { loadingToast, updateToast } = useToast();
  const { completeAddress } = useAppSelector((state) => state.location);
  const { removeCartHandler } = useCart();
  const dispatch = useAppDispatch();

  const { lat, lng } = completeAddress[0];

  const responseData = (toastID: any) => ({
    onMutate: () => {
      loadingToast(toastID);
    },
    onSettled: () => {
      queryClient.invalidateQueries("cart");
    },
    onSuccess: (response: any) => {
      console.log("mutation-response", response);
      const formattedCart = formatCart(response.data.cart);
      dispatch(addToCart(formattedCart));
      updateToast(toastID, toast.TYPE.SUCCESS, response.data.message);
    },
    onError: (err: any) => {
      console.log("mutation-err", err);
      updateToast(toastID, toast.TYPE.ERROR, err?.response?.data?.message);
    },
  });

  function useAddToCart() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation(
      ({ product, qty }: addToCartMutationType) => {
        const cartId = cart.length > 0 ? { cartId: cart[0]?.cartId } : "";
        const productDetails = {
          ...cartId,
          item: {
            productId: product._id,
            qty,
          },
          coordinates: [lng, lat],
        };
        return addToCartRequest(productDetails);
      },
      {
        mutationKey: "addProductToCart",
        ...result,
      }
    );
  }

  function useUpdateCart() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation(
      ({ itemId, qty }: updateCartMutationType) => {
        const productDetails = {
          cartId: cart[0]?.cartId,
          itemId,
          qty,
        };
        return updateCartRequest(productDetails);
      },
      {
        mutationKey: "updateCartProduct",
        ...result,
      }
    );
  }

  function useRemoveCartItem() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation(
      (productName: string): any => {
        console.log("productName", productName);
        removeCartHandler(productName);
      },
      {
        mutationKey: "removeProducfromCart",
        ...result,
      }
    );
  }

  return { useAddToCart, useRemoveCartItem, cart, useUpdateCart };
}
