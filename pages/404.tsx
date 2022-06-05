import ArrowleftIcon from "@/components/icons/ArrowleftIcon";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();

  function goBackHandler() {
    router.back();
  }
  return (
    <>
      <div className="error-page">
        <div className="header">
          <button type="button" onClick={goBackHandler}>
            <ArrowleftIcon />
          </button>
          <h1>Not yet in your location</h1>
        </div>
        <div className="body">
          <div className="icon">
            <Image
              src="/errorIcon.webp"
              alt="error-404"
              height={200}
              width={280}
            />
          </div>
          <h5>We’re sorry we’re not yet at your location.</h5>
          <p className="text-center">
            Help us cater for your needs by suggesting your favorite store close
            to you.
          </p>
        </div>
      </div>
      <style jsx>{`
        .error-page {
          height: 100vh;
          width: 100%;
          background-color: white;
          display: flex;
          flex-direction: column;
        }
        .header {
          height: 40px;
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: center;
        }
        .header h1 {
          font-family: "Montserrat", sans-serif;
          font-size: 18px;
          font-weight: 700;
          text-align: center;
        }
        .header button {
          position: absolute;
          left: 20px;
          top: 10px;
          border: none;
          background-color: transparent;
        }
        .body {
          text-align: center;
          line-height: 16px;
          font-family: "Roboto", sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin-top: 20%;
          align-items: center;
          padding: 0px 20px;
        }
        .body h5 {
          font-weight: 700;
          font-size: 16px;
        }
        .body p {
          font-size: 14px;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
