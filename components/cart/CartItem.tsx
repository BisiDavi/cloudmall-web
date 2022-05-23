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
  cart: productType;
}

export default function CartItem({ cart }: cartProps) {
  const { cart: cartData } = useCart();
  const quantityText = cart.name.includes("Oranges") ? " piece " : " pack ";
  const vv = cartData.map((cartItem) => cartItem === cart.name);
  console.log("vv", vv, "cartData", cartData);
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
              <SubtractIcon />
              <span>
                {quantity} {quantityText}
              </span>
              <AddIcon fill="#013a93" />
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
            width: 40%;
            display: flex;
            align-items: center;
          }
          .controls span {
            margin: 0px 15px;
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
