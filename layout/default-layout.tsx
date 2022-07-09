/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import ArrowleftIcon from "@/components/icons/ArrowleftIcon";

interface Props {
  title: string;
  search?: JSX.Element;
  padding?: string;
  showArrow?: boolean;
}

export default function DefaultLayout({
  title,
  children,
  search,
  padding = "0px 20px",
  showArrow = true,
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
            {showArrow && (
              <button type="button" className="button" onClick={goBack}>
                <ArrowleftIcon />
              </button>
            )}

            <h3>{title}</h3>
          </div>
          <div className="search-view">{search}</div>
        </div>
        <section className="section">{children}</section>
      </main>
      <style jsx>{`
        .store-layout {
          height: 100vh;
        }
        .search-view {
          padding: 0px 20px;
        }
        .header {
          display: flex;
          padding: 15px 0px;
          flex-direction: column;
        }
        .top-view {
          height: 50px;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
          padding: 0px;
        }
        .top-view button.button {
          position: absolute;
          top: 15px;
          left: 10px;
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
          padding: ${padding};
          overflow: scroll;
        }
      `}</style>
    </>
  );
}
