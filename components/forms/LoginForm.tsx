import Input from "./FormElements/Input";
import Button from "@/components/buttons";
import { useRouter } from "next/router";

const formContent = [
  {
    placeholder: "Your Email or Phone number",
    label: "Email / Phone number",
    elementType: "input",
    name: "email",
    id: "login-email",
    type: "email",
  },
  {
    placeholder: "*************",
    label: "Password",
    elementType: "input",
    id: "login-password",
    type: "password",
    name: "password",
  },
];

export default function LoginForm() {
  const router = useRouter();
  function buttonHandler() {
    return router.push("/delivery-details");
  }
  return (
    <>
      <form className="loginForm">
        {formContent.map((inputContent) => (
          <Input input={inputContent} key={inputContent.name} />
        ))}

        <Button text="Login" className="itemButton" onClick={buttonHandler} />
      </form>
      <style jsx>{`
        .loginForm {
          display: flex;
          flex-direction: column;
          width: 100%;
          justify-content: center;
          margin: auto;
          margin-top: 30px;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
