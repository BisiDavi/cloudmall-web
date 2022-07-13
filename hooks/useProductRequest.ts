/* eslint-disable no-param-reassign */
import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";

export default function useProductRequest() {
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

  type storeDataType = {
    storeId: string;
  };

  function listProductCategories(baseURL: string, storeData: storeDataType) {
    return axios.post(`${baseURL}/products/categories`, storeData);
  }

  return {
    listProductCategories,
  };
}
