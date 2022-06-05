import DefaultLayout from "@/layout/default-layout";

export default function login() {
  return (
    <DefaultLayout title="Link your Account">
      <>
        <div className="content">
          <p>Login to link your Cloudmall Account</p>

          <button className="google-login">Login With Google</button>
          <p>Or</p>

          <button>Login</button>
        </div>
        <style jsx>{``}</style>
      </>
    </DefaultLayout>
  );
}
