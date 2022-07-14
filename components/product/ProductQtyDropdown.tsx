import type { SetStateAction, Dispatch } from "react";

import { productType } from "@/types/product-types";
import AddIcon from "@/components/icons/AddIcon";
import useCartMutationAction from "@/hooks/useCartMutationAction";

const qtyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  product: productType;
  storeId: string;
  dropdown: boolean;
  setDropdown: Dispatch<SetStateAction<boolean>>;
}

export default function ProductQtyDropdown({
  product,
  storeId,
  dropdown,
  setDropdown,
}: Props) {
  const { useAddToCart, cart, useUpdateCart } = useCartMutationAction();
  const cartActions = useAddToCart();
  const updateCartActions = useUpdateCart();

  const productInCart = cart[0]
    ? cart[0]?.items.filter((cartItem) => {
        return (
          cartItem.storeId === storeId && cartItem.productId === product._id
        );
      })
    : [];

  const productQuantity =
    productInCart && productInCart[0]?.qty ? productInCart[0]?.qty : 0;

  const buttonClassName =
    productQuantity && productQuantity > 0 ? "added" : "product-button";

  function dropdownHandler() {
    setDropdown(true);
  }

  function productQtyHandler(qty: number) {
    if (productInCart.length === 0) {
      cartActions.mutate({ product, qty });
    } else {
      const itemId = productInCart ? productInCart[0].itemId : "";
      return updateCartActions.mutate(
        { itemId, qty },
        {
          onSuccess() {
            setDropdown(false);
          },
        }
      );
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={dropdownHandler}
        className={`button ${buttonClassName}`}
      >
        {productQuantity > 0 ? productQuantity : <AddIcon />}
      </button>
      {dropdown && (
        // <div className="dropdown-overlay">
        <ul className="dropdown">
          {qtyArray.map((qtyItem) => (
            <li key={qtyItem} onClick={() => productQtyHandler(qtyItem)}>
              {qtyItem}
            </li>
          ))}
        </ul>
        // </div>
      )}
      <style jsx>
        {`
          .dropdown-overlay {
            background-color: black;
            width: 100%;
            heigth: 100%;
            display: flex;
          }
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
            top: auto;
            width: 40px;
            z-index: 100;
            border: 1px solid var(--neutral-gray-2);
            background-color: white;
            position: absolute;
            right: 0;
            margin-top: -60px;
            border-radius: 5px;
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
