import { useState } from "react";

import { productType } from "@/types/product-types";
import AddIcon from "@/components/icons/AddIcon";
import useCartMutationAction from "@/hooks/useCartMutationAction";

const qtyArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  product: productType;
}

export default function ProductQtyDropdown({ product }: Props) {
  const [dropdown, setDropdown] = useState(false);
  const [qty, setQty] = useState(0);
  const { useAddToCart } = useCartMutationAction();
  const cartActions = useAddToCart();
  const buttonClassName = qty && qty > 0 ? "added" : "product-button";

  function updateQty() {
    if (qty === 0) {
      return cartActions.mutate(
        { product, qty: 1 },
        {
          onSuccess() {
            setQty((prevState) => prevState + 1);
          },
        }
      );
    } else {
      return setDropdown(true);
    }
  }

  function productQtyHandler(qty: number) {
    cartActions.mutate(
      { product, qty },
      {
        onSuccess() {
          setQty(qty);
          setDropdown(false);
        },
      }
    );
  }
  return (
    <>
      <button
        type="button"
        onClick={updateQty}
        className={`button ${buttonClassName}`}
      >
        {qty > 0 ? qty : <AddIcon />}
      </button>
      {dropdown && (
        <ul className="dropdown">
          {qtyArray.map((qtyItem) => (
            <li key={qtyItem} onClick={() => productQtyHandler(qtyItem)}>
              {qtyItem}
            </li>
          ))}
        </ul>
      )}
      <style jsx>
        {`
          .button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            color: white;
            position: relative;
            height: 30px;
            width: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .dropdown {
            display: flex;
            flex-direction: column;
            padding: 0px;
            top: 0px;
            width: 40px;
            z-index: 100;
            border: 1px solid var(--neutral-gray-2);
            background-color: white;
          }
          .dropdown li {
            list-style: none;
            border-bottom: 1px solid black;
            padding: 5px;
            text-align: center;
          }
          .added {
            background-color: var(--deep-green);
          }
          .product-button {
            background-color: var(--mall-blue);
          }
        `}
      </style>
    </>
  );
}
