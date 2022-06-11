import axios from "axios";

export function listStore() {
  return axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/search`);
}

export function listStoreCategories() {
  return axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/stores/categories`);
}

export function getStoreProducts(postData: any) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/search`,
    postData
  );
}
