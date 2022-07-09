/* eslint-disable no-param-reassign */
import axios from "axios";

import {
  addToCartResponseType,
  checkoutDetailsType,
  updateCartMutationType,
} from "@/types/cart-type";
import { useAppSelector } from "@/hooks/useRedux";

export default function useCartRequest() {
  const { user }: any = useAppSelector((state) => state.user);

  axios.interceptors.request.use(
    (config: any) => {
      if (user?.token) {
        config.headers["Authorization"] = "Bearer " + user?.token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  function baseRequest(
    baseURL: string,
    requestType: "post" | "get",
    route: string,
    productDetails?: any
  ) {
    if (requestType === "post") {
      return axios.post(`${baseURL}/${route}`, productDetails);
    } else {
      return axios.get(`${baseURL}/${route}`);
    }
  }

  function addToCartRequest(
    baseURL: string,
    productDetails: addToCartResponseType
  ) {
    return baseRequest(baseURL, "post", "users/cart/items/add", productDetails);
  }

  function updateCartRequest(
    baseURL: string,
    productDetails: updateCartMutationType
  ) {
    return baseRequest(
      baseURL,
      "post",
      "users/cart/items/update",
      productDetails
    );
  }

  function getCartRequest(baseURL: string) {
    return baseRequest(baseURL, "get", `users/cart`);
  }

  function getAuthenticatedCartRequest(baseURL: string) {
    return baseRequest(baseURL, "get", `users/cart`, null);
  }

  function removeCartItemRequest(
    baseURL: string,
    productDetails: { itemId: string }
  ) {
    return baseRequest(
      baseURL,
      "post",
      "users/cart/items/remove",
      productDetails
    );
  }

  function checkoutUserRequest(
    baseURL: string,
    checkoutDetails: checkoutDetailsType
  ) {
    return baseRequest(baseURL, "post", "users/checkout", checkoutDetails);
  }

  function clearExpiredCart(baseURL: string, clearCart: () => void) {
    return getCartRequest(baseURL).then((response) => {
      if (response.data?.message?.includes("No cart with")) {
        clearCart();
      }
    });
  }

  function getFlutterwaveKeys(baseURL: string) {
    return baseRequest(baseURL, "get", "utils/fw-keys");
  }

  function checkoutFlowRequest(
    baseURL: string,
    checkoutDetails: checkoutDetailsType
  ) {
    return getFlutterwaveKeys(baseURL)
      .then(() => {
        return checkoutUserRequest(baseURL, checkoutDetails);
      })
      .catch((err: any) => console.log("getFlutterwaveKeys-error", err));
  }

  function deleteCartRequest(baseURL: string) {
    return baseRequest(baseURL, "post", "users/cart/delete");
  }

  function verifyPaymentRequest(baseURL: string, txRefId: string) {
    return baseRequest(baseURL, "post", "transactions/verify", {
      txRef: txRefId,
    });
  }

  return {
    verifyPaymentRequest,
    deleteCartRequest,
    checkoutFlowRequest,
    clearExpiredCart,
    addToCartRequest,
    updateCartRequest,
    getAuthenticatedCartRequest,
    removeCartItemRequest,
    getFlutterwaveKeys,
    checkoutUserRequest,
    getCartRequest,
  };
}
