import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { toast } from "react-toastify";

import useToast from "@/hooks/useToast";
import useCart from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addToCartRequest } from "@/utils/cartRequest";
import { addToCart } from "@/redux/cart-slice";
import formatCart from "@/utils/formatCart";

type mutationType = {
  product: {
    _id: string;
  };
  qty: number;
};

export default function useCartMutationAction() {
  const queryClient = useQueryClient();
  const { cart } = useAppSelector((state) => state.cart);
  const { loadingToast, updateToast } = useToast();
  const { completeAddress } = useAppSelector((state) => state.location);
  const { removeCartHandler } = useCart();
  const dispatch = useAppDispatch();

  const { lat, lng } = completeAddress[0];

  function useAddToCart() {
    const toastID = useRef(null);

    return useMutation(
      ({ product, qty }: mutationType) => {
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
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: (response) => {
          console.log("add-to-cart-response", response);
          const formattedCart = formatCart(response.data.cart);
          console.log("formattedCart", formattedCart);
          dispatch(addToCart(formattedCart));
          updateToast(toastID, toast.TYPE.SUCCESS, response.data.message);
        },
        onError: (err: any) => {
          console.log("add-to-cart-err", err);
          updateToast(toastID, toast.TYPE.ERROR, err?.response?.data?.message);
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
