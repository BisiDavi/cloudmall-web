import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";

import { userLogin } from "@/utils/authRequest";
import { loginType } from "@/types/auth-type";
import { useRouter } from "next/router";

export default function useAuthMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { loadingToast, updateToast } = useToast();
  const toastID = useRef(null);

  function useUserLogin() {
    return useMutation(
      ({ userType, password, emailOrPhone }: loginType) => {
        const formatEmailOrPhone = emailOrPhone.includes("@")
          ? { email: emailOrPhone }
          : { phonenumber: emailOrPhone };
        return userLogin({ userType, password, ...formatEmailOrPhone });
      },
      {
        mutationKey: "useUserLogin",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => queryClient.invalidateQueries("authRequest"),
        onSuccess: (data) => {
          console.log("auth-login", data);
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
