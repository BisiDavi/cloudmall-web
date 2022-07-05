import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "@/components/forms/schema/loginSchema";
import useAuthMutation from "@/hooks/useAuthMutation";
import { loginType, submitHandlerType } from "@/types/auth-type";
import { updateLogin } from "@/redux/login-slice";
import { useAppDispatch } from "@/hooks/useRedux";

export default function useLogin() {
  const methods = useForm<loginType>({
    resolver: yupResolver(loginSchema),
  });
  const { useUserLogin } = useAuthMutation();
  const userLogin = useUserLogin();
  const dispatch = useAppDispatch();

  const isLoading = userLogin.isLoading;

  function submitHandler(data: submitHandlerType) {
    const { password, emailOrPhone } = data;

    if (emailOrPhone.includes("@")) {
      console.log(true);
      dispatch(updateLogin({ email: emailOrPhone }));
    } else {
      console.log(false);
      dispatch(updateLogin({ phone: emailOrPhone }));
    }

    return userLogin.mutate({ userType: "USER", password, emailOrPhone });
  }

  return { methods, submitHandler, isLoading };
}
