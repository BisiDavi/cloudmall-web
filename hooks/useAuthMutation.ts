import { useMutation } from "react-query";
import { useRef } from "react";
import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { userLogin } from "@/utils/authRequest";
import { loginType } from "@/types/auth-type";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { updateAuthToken } from "@/redux/login-slice";

export default function useAuthMutation() {
  const router = useRouter();
  const { loadingToast, updateToast } = useToast();
  const toastID = useRef(null);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function useUserLogin() {
    return useMutation(
      ({ userType, password, emailOrPhone }: loginType) => {
        const formatEmailOrPhone = emailOrPhone.includes("@")
          ? { email: emailOrPhone }
          : { phonenumber: emailOrPhone };
        return userLogin({
          userType,
          password,
          rememberMe: true,
          cartId: cart[0].cartId,
          ...formatEmailOrPhone,
        });
      },
      {
        mutationKey: "useUserLogin",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSuccess: (data) => {
          dispatch(updateAuthToken(data.data.token));
          updateToast(toastID, "success", "login success");
          router.push("/delivery-details");
        },
        onError: (data: any) => {
          const errorMessage = data.response.data.message;
          updateToast(toastID, "error", errorMessage);
        },
      }
    );
  }

  return { useUserLogin };
}
