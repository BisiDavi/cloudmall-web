import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";

import { userLogin } from "@/utils/authRequest";

export default function useAuthMutation() {
  const queryClient = useQueryClient();
  const { loadingToast, updateToast } = useToast();
  const toastID = useRef(null);

  function useUserLogin() {
    return useMutation(
      ({ userType, password, emailOrPhone }: any) => {
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
        },
        onError: (data) => {
          console.log("auth-login-error", data);
          updateToast(toastID, "error", "login error");
        },
      }
    );
  }

  return { useUserLogin };
}
