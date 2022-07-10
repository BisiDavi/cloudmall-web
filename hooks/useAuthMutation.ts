import { useMutation } from "react-query";
import { useRef } from "react";
import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { userLogin } from "@/utils/authRequest";
import { loginType } from "@/types/auth-type";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateLogin } from "@/redux/login-slice";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useAuthMutation() {
  const router = useRouter();
  const { loadingToast, updateToast } = useToast();
  const [baseURL] = useBaseUrl();
  const toastID = useRef(null);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  function useUserLogin() {
    return useMutation(
      ({ userType, password, emailOrPhone }: loginType) => {
        const formatEmailOrPhone = emailOrPhone.includes("@")
          ? { email: emailOrPhone }
          : { phonenumber: emailOrPhone };
        return userLogin(baseURL, {
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
        onSuccess: (data: any) => {
          dispatch(
            updateLogin({
              user: {
                email: data?.data?.user.email
                  ? data?.data?.user.email
                  : "cloudmallnigeria@gmail.com",
                phone: data?.data?.user.phonenumber,
                name: `${data?.data?.user?.surname} ${data?.data?.user?.firstname}`,
                id: data?.data.user._id,
                walletBalance: data?.data?.user?.walletBalance,
              },
              token: data.data.token,
            })
          );
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
