/* eslint-disable no-param-reassign */
import axios from "axios";

import { useAppSelector } from "@/hooks/useRedux";
import useBaseUrl from "./useBaseUrl";

type userDetailsType = {
  address: string;
  coordinates?: number[];
  type: string;
  isDefault?: boolean;
};

type updateAddress = userDetailsType & {
  addressId: string;
};

export default function useAddressRequest() {
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
  function createUserAddress(userDetails: userDetailsType) {
    return axios.post(`${baseURL}/users/addresses/create`, userDetails);
  }

  function updateUserAddress(userDetails: updateAddress) {
    return axios.post(`${baseURL}/users/addresses/update`, userDetails);
  }

  function deleteUserAddress(addressId: string) {
    return axios.post(`${baseURL}/users/addresses/delete`, addressId);
  }

  function getUserProfile() {
    return axios.get(`${baseURL}/users/profile`);
  }

  return {
    createUserAddress,
    updateUserAddress,
    deleteUserAddress,
    getUserProfile,
  };
}
