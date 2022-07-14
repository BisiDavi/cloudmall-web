/* eslint-disable no-param-reassign */
import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";

type userDetailsType = {
  address: string;
  coordinates: number[];
  type: string;
  isDefault: boolean;
};

export default function useAddressRequest() {
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
  function createUserAddress(baseURL: string, userDetails: userDetailsType) {
    return axios.post(`${baseURL}/users/addresses/create`, userDetails);
  }

  function updateUserAddress(baseURL: string, userDetails: userDetailsType) {
    return axios.post(`${baseURL}/users/addresses/update`, userDetails);
  }

  function getUserProfile(baseURL: string) {
    return axios.get(`${baseURL}/users/profile`);
  }

  return {
    createUserAddress,
    updateUserAddress,
    getUserProfile,
  };
}
