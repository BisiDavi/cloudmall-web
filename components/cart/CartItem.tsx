import useCartMutationAction from "@/hooks/useCartMutationAction";
import useCart from "@/hooks/useCart";
import { productType } from "@/types/product-types";
import Image from "next/image";
import React from "react";
import AddIcon from "../icons/AddIcon";
import MapIcon from "../icons/MapIcon";
import NoteIcon from "../icons/NoteIcon";
import SubtractIcon from "../icons/SubtractIcon";
import TrashIcon from "../icons/TrashIcon";

interface cartProps {
  cart: any;
}

export default function CartItem({ cart }: cartProps) {
  const { cart: cartData } = useCart();
  const quantityText = cart.name.includes("Oranges") ? " piece " : " pack ";
  const vv = cartData.map((cartItem) => cartItem === cart.name);
  const { useAddToCart, useRemoveCartItem } = useCartMutationAction();
  const addToCart = useAddToCart();
  const removeCartItem = useRemoveCartItem();

  const quantity = cartData.filter(
    (cartItem) => cartItem.name === cart.name
  ).length;

  return (
    <>
      <div className="cartItem">
        <Image src={cart.image} height={100} width={100} alt={cart.name} />
        <div className="content">
          <div className="layer">
            <div className="group">
              <h4>{cart.name}</h4>
              <h6 className="store">
                <MapIcon />
                <span>{cart.store}</span>
              </h6>
            </div>
            <h4 className="price">N {cart.price}</h4>
          </div>
          <div className="layer cart-controls">
            <TrashIcon />
            <NoteIcon />
            <div className="controls">
              <button
              // onClick={() => removeCartItem.mutate(cart.name)}
              >
                <SubtractIcon />
              </button>
              <span>
                {quantity} {quantityText}
              </span>
              <button onClick={() => addToCart.mutate(cart)}>
                <AddIcon fill="#013a93" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .cartItem {
            display: flex;
            align-items: center;
            width: 100%;
            border-bottom: 1px solid rgba(62, 64, 68, 0.25);
            padding: 15px 10px;
          }
          .content {
            width: 100%;
            margin-left: 20px;
          }
          .cart-controls button {
            border: none;
            background-color: transparent;
          }
          .layer {
            display: flex;
            justify-content: space-between;
            width: 100%;
          }
          .layer.cart-controls {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
          }
          .controls {
            width: 55%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .controls span {
            margin: 0px 10px;
            font-size: 12px;
            color: var(--text-color);
            font-weight: 300;
          }
          .store {
            display: flex;
            align-items: center;
            margin-top: 10px;
          }
          .store span {
            margin-left: 10px;
          }
        `}
      </style>
    </>
  );
}
