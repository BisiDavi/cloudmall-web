import {
  addToCartResponseType,
  checkoutDetailsType,
  deleteCartItemMutationType,
  updateCartMutationType,
} from "@/types/cart-type";
import axios from "axios";
import { getFlutterwaveKeys } from "./utilsRequest";

export function baseRequest(
  requestType: "post" | "get",
  route: string,
  productDetails?: any
) {
  if (requestType === "post") {
    return axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${route}`,
      productDetails
    );
  } else {
    return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/${route}`);
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

export function removeCartItemRequest(
  productDetails: deleteCartItemMutationType
) {
  return baseRequest("post", "users/cart/items/remove", productDetails);
}

export function checkoutUserRequest(checkoutDetails: checkoutDetailsType) {
  return baseRequest("post", "users/checkout", checkoutDetails);
}

export function clearExpiredCart(cartId: string, clearCart: () => void) {
  getCartRequest(cartId).then((response) => {
    if (response.data?.message?.includes("No cart with")) {
      clearCart();
    }
  });
}

export function checkoutFlowRequest(checkoutDetails: checkoutDetailsType) {
  getFlutterwaveKeys()
    .then((response) => {
      console.log("getFlutterwaveKeys-response", response);
      checkoutUserRequest(checkoutDetails)
        .then((response) => {
          console.log("checkoutDetails-response", response);
        })
        .catch((err) => console.log("checkoutDetails-error", err));
    })
    .catch((err) => console.log("getFlutterwaveKeys-error", err));
}
