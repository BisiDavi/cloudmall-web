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

  function listProductCategories(baseURL: string, storeId: string) {
    return axios.get(`${baseURL}/products/categories/?storeId=${storeId}`);
  }

  return {
    listProductCategories,
  };
}
