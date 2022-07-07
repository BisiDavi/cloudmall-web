import axios from "axios";

export function listStore(baseURL: string, storeData?: any) {
  if (storeData) {
    return axios.post(`${baseURL}/stores/search`, storeData);
  } else {
    return axios.post(`${baseURL}/stores/search`);
  }
}

export function storeProfile(baseURL: string, storeId: any) {
  return axios.get(`${baseURL}/stores/profile/?storeId=${storeId}`);
}

export function listStoreCategories(baseURL: string) {
  return axios.get(`${baseURL}/stores/categories`);
}

export function getStoreProducts(baseURL: string, postData: any) {
  return axios.post(`${baseURL}/products/search`, postData);
}
