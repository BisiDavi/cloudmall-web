import Link from "next/link";
import { useRouter } from "next/router";

export default function CartFooter({ total }: any) {
  const router = useRouter();

  function onClickHandler() {
    return router.push("/auth/login");
  }

  return (
    <>
      <div className="footer">
        <div className="cost">
          <h4>Total Cost</h4>
          <h4>N {total}</h4>
        </div>
        <Link href="/auth/login" passHref>
          <a className="itemButton cart" onClick={onClickHandler}>
            Checkout
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .footer {
            position: fixed;
            display: flex;
            flex-direction: column;
            margin: auto;
            bottom: 0px;
            width: 100%;
            left: 0px;
            padding-bottom: 10px;
          }
          .cost {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--light-gray);
            padding: 20px;
            margin-bottom: 20px;
          }
        `}
      </style>
    </>
  );
}
