import Button from "@/components/buttons";
import ArrowleftIcon from "@/components/icons/ArrowleftIcon";
import CartIcon from "@/components/icons/CartIcon";
import SearchStore from "@/components/search/SearchStore";
import UpdateLocation from "@/components/update-location";
import { useAppSelector } from "@/hooks/useRedux";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

interface Props {
  title: string;
}

export default function StoreLayoutPage({
  title,
  children,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const homepage = router.asPath === "/" ? true : false;
  const cartPage = router.asPath.includes("/cart") ? true : false;
  const { cart } = useAppSelector((state) => state.cart);
  let uniqueCartItems: any = [];
  cart.map((cartItem) => uniqueCartItems.push(cartItem.name));
  const uniqueCartItem = new Set(uniqueCartItems);
  const uniqueCartItemArray = Array.from(uniqueCartItem);
  const noOfCartItems =
    uniqueCartItemArray.length > 0 ? uniqueCartItemArray.length : "";
  const buttontext = `${noOfCartItems} Items`;
  function goBack() {
    router.back();
  }
  return (
    <>
      <main className="store-layout">
        <div className="header">
          <div className="top-view">
            {!homepage && (
              <button type="button" className="button" onClick={goBack}>
                <ArrowleftIcon />
              </button>
            )}
            <h3>{title}</h3>
          </div>
          <SearchStore />
        </div>
        <section className="section">{children}</section>
        {!cartPage && (
          <div className="footer">
            <UpdateLocation />
            <Link passHref href="/cart">
              <a>
                <Button
                  className="itemButton"
                  icon={<CartIcon />}
                  text={buttontext}
                />
              </a>
            </Link>
          </div>
        )}
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
          line-height: 21px;
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
