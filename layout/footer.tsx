import Link from "next/link";

import UpdateLocation from "@/components/update-location";
import Button from "@/components/buttons";
import CartIcon from "@/components/icons/CartIcon";
import { useAppSelector } from "@/hooks/useRedux";

export default function Footer() {
  const { cart } = useAppSelector((state) => state.cart);
  let uniqueCartItems: any = [];
  cart?.map((cartItem) => uniqueCartItems.push(cartItem.name));
  const uniqueCartItem = new Set(uniqueCartItems);
  const uniqueCartItemArray = Array.from(uniqueCartItem);

  const buttontext =
    uniqueCartItemArray.length === 1
      ? `${uniqueCartItemArray.length} item`
      : uniqueCartItemArray.length > 1
      ? `${uniqueCartItemArray.length} items`
      : "Cart is empty";
  const disableButton = uniqueCartItemArray.length === 0 ? true : false;

  return (
    <>
      <div className="footer">
        <UpdateLocation />
        <Link passHref href="/order">
          <a>
            <Button
              className="itemButton"
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
            background-color: var(--light-blue);
            height: 65px;
            align-items: center;
            border-top: 1px solid rgba(62, 64, 68, 0.25);
          }
        `}
      </style>
    </>
  );
}
