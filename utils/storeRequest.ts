import axios from "axios";

export function listStore(storeData: any) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stores/search`,
    storeData
  );
}

export function storeProfile(storeId: any) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stores/profile/?storeId=${storeId}`
  );
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
