import {
  addToCartResponseType,
  updateCartMutationType,
} from "@/types/cart-type";
import axios from "axios";

function baseRequest(productDetails: any, route: string) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${route}`,
    productDetails
  );
}

export function addToCartRequest(productDetails: addToCartResponseType) {
  return baseRequest(productDetails, "users/cart/items/add");
}

export function updateCartRequest(productDetails: updateCartMutationType) {
  return baseRequest(productDetails, "users/cart/items/update");
}
