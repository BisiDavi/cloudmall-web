import {
  addToCartResponseType,
  checkoutDetailsType,
  deleteCartItemMutationType,
  updateCartMutationType,
} from "@/types/cart-type";
import axios from "axios";
import { getFlutterwaveKeys } from "@/utils/utilsRequest";

export function baseRequest(
  baseURL: string,
  requestType: "post" | "get",
  route: string,
  productDetails?: any,
  config?: any
) {
  if (requestType === "post") {
    return axios.post(`${baseURL}/${route}`, productDetails, config);
  } else {
    return axios.get(`${baseURL}/${route}`, config);
  }
}

export function addToCartRequest(
  baseURL: string,
  productDetails: addToCartResponseType
) {
  return baseRequest(baseURL, "post", "users/cart/items/add", productDetails);
}

export function updateCartRequest(
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

export function getCartRequest(baseURL: string, cartId: string) {
  return baseRequest(baseURL, "get", `users/cart?cartId=${cartId}`);
}

export function getAuthenticatedCartRequest(baseURL: string, token: string) {
  return baseRequest(baseURL, "get", `users/cart`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function removeCartItemRequest(
  baseURL: string,
  productDetails: deleteCartItemMutationType
) {
  return baseRequest(
    baseURL,
    "post",
    "users/cart/items/remove",
    productDetails
  );
}

export function checkoutUserRequest(
  baseURL: string,
  checkoutDetails: checkoutDetailsType,
  token: string
) {
  return baseRequest(baseURL, "post", "users/checkout", checkoutDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function clearExpiredCart(
  baseURL: string,
  cartId: string,
  clearCart: () => void
) {
  getCartRequest(baseURL, cartId).then((response) => {
    if (response.data?.message?.includes("No cart with")) {
      clearCart();
    }
  });
}

export function checkoutFlowRequest(
  baseURL: string,

  checkoutDetails: checkoutDetailsType,
  token: string
) {
  return getFlutterwaveKeys(baseURL)
    .then(() => {
      return checkoutUserRequest(baseURL, checkoutDetails, token);
    })
    .catch((err) => console.log("getFlutterwaveKeys-error", err));
}

export function deleteCartRequest(baseURL: string, cartId: string) {
  return baseRequest(baseURL, "post", "users/cart/delete", { cartId });
}

export function verifyPaymentRequest(
  baseURL: string,
  txRefId: string,
  token: string
) {
  return baseRequest(
    baseURL,
    "post",
    "transactions/verify",
    { txRef: txRefId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
