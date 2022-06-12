import axios from "axios";

export function addToCart(productDetails: any) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/cart/items/add`,
    productDetails
  );
}
