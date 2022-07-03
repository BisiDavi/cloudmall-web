import axios from "axios";

export function googleSignin(postData: any) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/user/sign-in/web`,
    postData
  );
}

type userLoginType = {
  userType: string;
  email?: string;
  phonenumber?: string;
  password: string;
};

export function userLogin(postData: userLoginType) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/sign-in`,
    postData
  );
}
