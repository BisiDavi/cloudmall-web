import { useMutation } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import { googleRedirect, googleSignin } from "@/utils/authRequest";
import { useAppSelector } from "@/hooks/useRedux";

export default function useGoogleLoginMutation() {
  const { loadingToast, updateToast } = useToast();

  function useGoogleSignin() {
    return useMutation(
      ({ code, cartId }: any) => googleSignin({ code, cartId }),
      {
        mutationKey: "useGoogleSignin",
        onSuccess: (_, variables) => {
          updateToast(variables.toastID, "success", "updated");
        },
        onError: (data: any, variables) => {
          console.log("variables", variables);
          updateToast(variables.toastID, "error", data.response.data.message);
        },
      }
    );
  }

  const googleRedirectFunc = useGoogleSignin();

  // redirect first
  // google sign in
  function useGoogleLogin() {
    const toastID = useRef(null);
    const { cart } = useAppSelector((state) => state.cart);

    const cartId = cart[0]?.cartId;

    return useMutation(googleRedirect, {
      mutationKey: "useGoogleLogin",
      onMutate: () => loadingToast(toastID),
      onSuccess: (data) => {
        googleRedirectFunc.mutate({ code: data.data.url, cartId, toastID });
        googleRedirectFunc.isSuccess &&
          updateToast(toastID, "success", "login successful");
      },
      onError: (data: any) =>
        updateToast(toastID, "error", data.response.data.message),
    });
  }

  return { useGoogleLogin };
}
