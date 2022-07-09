/* eslint-disable no-param-reassign */
import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";

export default function useStoreRequest() {
  const { user }: any = useAppSelector((state) => state.user);

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

  function listStore(baseURL: string, storeData?: any) {
    if (storeData) {
      return axios.post(`${baseURL}/stores/search`, storeData);
    } else {
      return axios.post(`${baseURL}/stores/search`);
    }
  }

  function storeProfile(baseURL: string, storeId: any) {
    return axios.get(`${baseURL}/stores/profile/?storeId=${storeId}`);
  }

  function listStoreCategories(baseURL: string) {
    return axios.get(`${baseURL}/stores/categories`);
  }

  function getStoreProducts(baseURL: string, postData: any) {
    return axios.post(`${baseURL}/products/search`, postData);
  }

  return {
    listStore,
    storeProfile,
    listStoreCategories,
    getStoreProducts,
  };
}
