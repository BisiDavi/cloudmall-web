import Image from "next/image";

import DefaultLayout from "@/layout/default-layout";
import LoginForm from "@/components/forms/LoginForm";

export default function login() {
  return (
    <DefaultLayout title="Link your Account">
      <>
        <div className="content loginPage">
          <p className="loginText">Login to link your Cloudmall Account</p>

          <button className="google-login">
            <Image
              src="/googleIcon.png"
              height={20}
              width={20}
              alt="google icon"
            />
            <span className="login">Login With Google</span>
          </button>
          <p>Or</p>
          <LoginForm />
        </div>
        <style jsx>{`
          .content p {
            text-align: center;
          }
          .loginPage {
            width: 100%;
          }
          button.google-login {
            border: 1px solid var(--text-color);
            width: 100%;
            margin: auto;
            display: flex;
            justify-content: center;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
            align-items: center;
          }
          button.google-login:focus {
            background-color: var(--mall-blue);
            color: white;
          }
          span.login {
            margin-left: 10px;
          }
        `}</style>
      </>
    </DefaultLayout>
  );
}
