import ArrowleftIcon from "@/components/icons/ArrowleftIcon";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
  search?: JSX.Element;
}

export default function DefaultLayout({
  title,
  children,
  search,
}: PropsWithChildren<Props>) {
  const router = useRouter();

  function goBack() {
    router.back();
  }
  return (
    <>
      <main className="store-layout">
        <div className="header">
          <div className="top-view">
            <button type="button" className="button" onClick={goBack}>
              <ArrowleftIcon />
            </button>

            <h3>{title}</h3>
          </div>
          {search}
        </div>
        <section className="section">{children}</section>
      </main>
      <style jsx>{`
        .store-layout {
          height: 100vh;
        }
        .header {
          display: flex;
          padding: 15px 20px;
          flex-direction: column;
        }
        .top-view {
          height: 50px;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
        }
        .top-view button.button {
          position: absolute;
          top: 15px;
          left: 5px;
          border: none;
          background-color: transparent;
        }
        .top-view h3 {
          text-align: center;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          font-family: "Montserrat", sans-serif;
          font-style: normal;
          font-weight: 700;
          color: var(--text-color);
        }
        .section {
          height: 75vh;
          overflow: scroll;
        }
        .footer {
          display: flex;
          padding: 0px 10px;
          position: fixed;
          bottom: 0px;
          background-color: white;
          padding: 12px 20px;
          height: 80px;
          align-items: center;
          width: 100%;
          border-top: 1px solid rgba(62, 64, 68, 0.25);
        }
      `}</style>
    </>
  );
}
