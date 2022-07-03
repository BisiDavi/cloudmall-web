import { useMutation } from "react-query";
import { useRef } from "react";
import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { userLogin } from "@/utils/authRequest";
import { loginType } from "@/types/auth-type";

export default function useAuthMutation() {
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
        onSuccess: () => {
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
