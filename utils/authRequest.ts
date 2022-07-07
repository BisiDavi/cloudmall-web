import { googleSigninType, userLoginType } from "@/types/auth-type";
import axios from "axios";

export function userLogin(baseURL: string, postData: userLoginType) {
  return axios.post(`${baseURL}/auth/sign-in`, postData);
}

export function googleRedirect(baseURL: string) {
  return axios.get(`${baseURL}/auth/google/get-redirect-url`);
}

export function googleSignin(baseURL: string, postData: googleSigninType) {
  const { code, cartId } = postData;
  return axios.get(
    `${baseURL}/auth/google/user/sign-in/web?code=${code}&cartId=${cartId}`
  );
}
