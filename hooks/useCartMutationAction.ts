import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  addToCartRequest,
  deleteCartRequest,
  removeCartItemRequest,
  updateCartRequest,
} from "@/utils/cartRequest";
import { addToCart, clearCart } from "@/redux/cart-slice";
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
  const dispatch = useAppDispatch();

  const { lat, lng } =
    completeAddress.length > 0
      ? completeAddress[0]
      : { lat: 7.5207, lng: 4.5303 };

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
    const cartId = cart[0]?.cartId;
    return useMutation(
      (itemId: string) => removeCartItemRequest({ cartId, itemId }),
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
    return useMutation(() => deleteCartRequest(cartId), {
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
