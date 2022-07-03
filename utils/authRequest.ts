import { googleSigninType, userLoginType } from "@/types/auth-type";
import axios from "axios";

export function userLogin(postData: userLoginType) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`,
    postData
  );
}

export function googleRedirect() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/get-redirect-url`
  );
}

export function googleSignin(postData: googleSigninType) {
  const { code, cartId } = postData;
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/user/sign-in/web?code=${code}&cartId=${cartId}`
  );
}
