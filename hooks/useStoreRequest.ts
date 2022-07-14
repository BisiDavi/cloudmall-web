/* eslint-disable no-param-reassign */
import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";
import useBaseUrl from "./useBaseUrl";

export default function useStoreRequest() {
  const { user }: any = useAppSelector((state) => state.user);
  const [baseURL] = useBaseUrl();

  axios.interceptors.request.use(
    (config: any) => {
      if (user?.token) {
        config.headers["Authorization"] = "Bearer " + user?.token;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  function listStore(storeData?: any) {
    if (storeData) {
      return axios.post(`${baseURL}/stores/search`, storeData);
    } else {
      return axios.post(`${baseURL}/stores/search`);
    }
  }

  function storeProfile(storeId: any) {
    return axios.get(`${baseURL}/stores/profile/?storeId=${storeId}`);
  }

  function listStoreCategories() {
    return axios.get(`${baseURL}/stores/categories`);
  }

  function getStoreProducts(postData: any) {
    return axios.post(`${baseURL}/products/search`, postData);
  }

  return {
    listStore,
    storeProfile,
    listStoreCategories,
    getStoreProducts,
  };
}
