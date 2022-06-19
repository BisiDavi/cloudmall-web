import axios from "axios";

export function addToCartRequest(productDetails: any) {
  console.log("productDetails", productDetails);
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/cart/items/add`,
    productDetails
  );
}
