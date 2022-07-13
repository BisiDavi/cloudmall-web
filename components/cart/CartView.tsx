/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import CartItem from "@/components/cart/CartItem";
import useCart from "@/hooks/useCart";
import CartFooter from "@/components/cart/CartFooter";
import LoginQuestionModal from "@/components/modals/LoginQuestionModal";
import useModal from "@/hooks/useModal";

export default function CartView() {
  const { useGetCart } = useCart();
  const [cart, status] = useGetCart();
  const { modal, updateModalHandler } = useModal();

  console.log("cart", cart);

  return (
    <>
      {modal === "loginQuestionModal" && (
        <LoginQuestionModal
          showModal={modal}
          closeModal={() => updateModalHandler(null)}
        />
      )}
      {status === "error" ? (
        "error occured"
      ) : status === "loading" ? (
        <Image
          src="/shopping-cart.gif"
          alt="cart loading"
          height={300}
          width={300}
        />
      ) : cart === undefined ? (
        <>
          <h4 className="emptyCartText">Cart is Empty</h4>
          <img
            className="emptyCartImg"
            src="/errorIcon.webp"
            alt="empty cart"
          />
        </>
      ) : (
        cart?.items.map((cartItem: any, index: number) => (
          <CartItem item={cartItem} key={cartItem._id} index={index} />
        ))
      )}
      {cart !== undefined && <CartFooter total={cart?.fees?.items} />}
      <div className="bottom" />
      <style jsx>
        {`
          .emptyCartText {
            text-align: center;
            font-size: 20px;
            font-weight: 300;
            color: red;
          }
          .emptyCartImg {
            display: flex;
            margin: 20px auto;
          }
          .bottom {
            margin-bottom: 140px;
          }
          .empty-cart {
            display: flex;
            justify-content: center;
            margin-top: 8px;
          }
          .empty-cart button {
            align-item: center;
            display: flex;
            border: 1px solid var(--mall-blue);
            color: var(--mall-blue);
            padding: 5px 10px;
            background-color: transparent;
            border-radius: 4px;
          }
          .empty-cart button:focus,
          .empty-cart button:hover {
            background-color: var(--mall-blue);
            color: white;
          }
          .trash {
            margin-right: 5px;
            margin-bottom: 0px;
          }
        `}
      </style>
    </>
  );
}
