import { FormProvider } from "react-hook-form";

import Button from "@/components/buttons";
import loginContent from "@/json/login-form.json";
import useLogin from "@/hooks/useLogin";
import SelectFormElement from "@/components/forms/SelectFormElement";

export default function LoginForm() {
  const { methods, submitHandler } = useLogin();

  return (
    <FormProvider {...methods}>
      <form
        className="loginForm"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        {loginContent.map((inputContent) => (
          <SelectFormElement input={inputContent} key={inputContent.name} />
        ))}

        <Button text="Login" type="submit" className="itemButton" />
      </form>
      <style jsx>{`
        .loginForm {
          display: flex;
          flex-direction: column;
          width: 100%;
          justify-content: center;
          margin: auto;
          margin-top: 30px;
          margin-bottom: 10px;
        }
      `}</style>
    </FormProvider>
  );
}
