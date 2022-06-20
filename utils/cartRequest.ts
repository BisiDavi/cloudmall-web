import {
  addToCartResponseType,
  deleteCartItemMutationType,
  updateCartMutationType,
} from "@/types/cart-type";
import axios from "axios";

function baseRequest(
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
