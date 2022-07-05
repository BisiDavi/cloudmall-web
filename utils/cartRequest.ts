import {
  addToCartResponseType,
  checkoutDetailsType,
  deleteCartItemMutationType,
  updateCartMutationType,
} from "@/types/cart-type";
import axios from "axios";
import { getFlutterwaveKeys } from "@/utils/utilsRequest";

export function baseRequest(
  requestType: "post" | "get",
  route: string,
  productDetails?: any,
  config?: any
) {
  if (requestType === "post") {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${route}`,
      productDetails,
      config
    );
  } else {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${route}`, config);
  }
}

export function addToCartRequest(productDetails: addToCartResponseType) {
  return baseRequest("post", "users/cart/items/add", productDetails);
}

export function updateCartRequest(productDetails: updateCartMutationType) {
  return baseRequest("post", "users/cart/items/update", productDetails);
}

export function getCartRequest(cartId: string) {
  return baseRequest("get", `users/cart?cartId=${cartId}`);
}

export function getAuthenticatedCartRequest(token: string) {
  return baseRequest("get", `users/cart`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function removeCartItemRequest(
  productDetails: deleteCartItemMutationType
) {
  return baseRequest("post", "users/cart/items/remove", productDetails);
}

export function checkoutUserRequest(
  checkoutDetails: checkoutDetailsType,
  token: string
) {
  return baseRequest("post", "users/checkout", checkoutDetails, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function clearExpiredCart(cartId: string, clearCart: () => void) {
  getCartRequest(cartId).then((response) => {
    if (response.data?.message?.includes("No cart with")) {
      clearCart();
    }
  });
}

export function checkoutFlowRequest(
  checkoutDetails: checkoutDetailsType,
  token: string
) {
  return getFlutterwaveKeys()
    .then((response) => {
      console.log("getFlutterwaveKeys-response", response);
      return checkoutUserRequest(checkoutDetails, token);
    })
    .catch((err) => console.log("getFlutterwaveKeys-error", err));
}

export function deleteCartRequest(cartId: string) {
  return baseRequest("post", "users/cart/delete", { cartId });
}

export function verifyPaymentRequest(txRefId: string, token: string) {
  return baseRequest(
    "post",
    "transactions/verify",
    { txRef: txRefId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}
