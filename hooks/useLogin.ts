import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "@/components/forms/schema/loginSchema";
import useAuthMutation from "./useAuthMutation";
import { loginType, submitHandlerType } from "@/types/auth-type";

export default function useLogin() {
  const methods = useForm<loginType>({
    resolver: yupResolver(loginSchema),
  });
  const { useUserLogin } = useAuthMutation();
  const userLogin = useUserLogin();

  const isLoading = userLogin.isLoading;

  function submitHandler(data: submitHandlerType) {
    const { password, emailOrPhone } = data;
    return userLogin.mutate({ userType: "USER", password, emailOrPhone });
  }

  return { methods, submitHandler, isLoading };
}
