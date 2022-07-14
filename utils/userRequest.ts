import axios from "axios";

type userDetailsType = {
  address: string;
  coordinates: number[];
  type: string;
  isDefault: boolean;
};

export function createUserAddress(
  baseURL: string,
  userDetails: userDetailsType
) {
  return axios.post(`${baseURL}/users/addresses/create`, userDetails);
}

export function updateUserAddress(
  baseURL: string,
  userDetails: userDetailsType
) {
  return axios.post(`${baseURL}/users/addresses/update`, userDetails);
}

export function getUserProfile(baseURL: string, userId: string) {
  return axios.get(`${baseURL}/users/profile?userId=${userId}`);
}
