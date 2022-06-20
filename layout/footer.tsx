import Link from "next/link";

import UpdateLocation from "@/components/update-location";
import Button from "@/components/buttons";
import CartIcon from "@/components/icons/CartIcon";
import { useAppSelector } from "@/hooks/useRedux";

export default function Footer() {
  const { cart } = useAppSelector((state) => state.cart);
  const cartQuantity = cart[0].items.length;

  const buttontext =
    cartQuantity === 1
      ? `${cartQuantity} item`
      : cartQuantity > 1
      ? `${cartQuantity} items`
      : "Cart is empty";
  const disableButton = cartQuantity === 0 ? true : false;

  const buttonColor = cartQuantity > 0 ? "filled" : "empty";

  return (
    <>
      <div className="footer">
        <UpdateLocation />
        <Link passHref href="/cart">
          <a>
            <Button
              className={`itemButton ${buttonColor}`}
              icon={<CartIcon />}
              text={buttontext}
              disabled={disableButton}
            />
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .footer {
            display: flex;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            padding: 12px 20px;
            z-index: 40;
            justify-content: space-between;
            height: 65px;
            align-items: center;
            border-top: 1px solid rgba(62, 64, 68, 0.25);
            background-color: white;
          }
        `}
      </style>
    </>
  );
}
