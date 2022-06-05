import React from "react";
import CartItem from "@/components/cart/CartItem";

export default function CartGroup({ cart }: any) {
  return (
    <>
      {cart.map((cartItem: any) => (
        <CartItem cart={cartItem} key={cartItem.name} />
      ))}
    </>
  );
}
