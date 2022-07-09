import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useCartRequest from "@/hooks/useCartRequest";
import { addToCart, clearCart } from "@/redux/cart-slice";
import formatCart from "@/utils/formatCart";
import {
  addToCartMutationType,
  updateCartMutationType,
} from "@/types/cart-type";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useCartMutationAction() {
  const queryClient = useQueryClient();
  const { cart } = useAppSelector((state) => state.cart);
  const {
    addToCartRequest,
    deleteCartRequest,
    removeCartItemRequest,
    updateCartRequest,
  } = useCartRequest();
  const baseURL = useBaseUrl();
  const { loadingToast, updateToast } = useToast();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [lng, lat] = user?.addresses[0]?.location?.coordinates;

  const responseData = (toastID: any, type?: string) => ({
    onMutate: () => {
      loadingToast(toastID);
    },
    onSettled: () => queryClient.invalidateQueries("getCartQuery"),
    onSuccess: (response: any) => {
      if (type === "emptyCart") {
        dispatch(clearCart());
      } else {
        const formattedCart = formatCart(response.data.cart);
        console.log("formattedCart", formattedCart);
        dispatch(addToCart(formattedCart));
      }
      updateToast(toastID, "success", response.data.message);
    },
    onError: (err: any) =>
      updateToast(toastID, "error", err?.response?.data?.message),
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
        return addToCartRequest(baseURL, productDetails);
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
        return updateCartRequest(baseURL, productDetails);
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
    const cartId = cart[0]?.cartId;
    return useMutation(
      (itemId: string) => removeCartItemRequest(baseURL, { cartId, itemId }),
      {
        mutationKey: "removeProducfromCart",
        ...result,
      }
    );
  }

  function useDeleteCartItem() {
    const toastID = useRef(null);
    const result = responseData(toastID, "emptyCart");
    const cartId = cart[0]?.cartId;
    return useMutation(() => deleteCartRequest(baseURL, cartId), {
      mutationKey: "useDeleteCartItem",
      ...result,
    });
  }

  return {
    useAddToCart,
    useRemoveCartItem,
    cart,
    useUpdateCart,
    useDeleteCartItem,
  };
}
