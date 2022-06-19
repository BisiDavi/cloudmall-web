import axios from "axios";

type userDetailsType = {
  userId: string;
  address: string;
  coordinates: number[];
  type: string;
  isDefault: boolean;
};

export function createUserAddress(userDetails: userDetailsType) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/addresses/create`,
    userDetails
  );
}