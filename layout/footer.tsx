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
  const noOfCartItems =
    uniqueCartItemArray.length > 0 ? uniqueCartItemArray.length : "";
  const buttontext = `${noOfCartItems} Items`;

  return (
    <>
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
      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
}
