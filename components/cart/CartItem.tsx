import Image from "next/image";

import useCartMutationAction from "@/hooks/useCartMutationAction";
import formatPrice from "@/utils/formatPrice";
import AddIcon from "../icons/AddIcon";
import MapIcon from "../icons/MapIcon";
import NoteIcon from "../icons/NoteIcon";
import SubtractIcon from "../icons/SubtractIcon";
import TrashIcon from "../icons/TrashIcon";

interface cartProps {
  item: any;
}

export default function CartItem({ item }: cartProps) {
  const { useUpdateCart, useRemoveCartItem } = useCartMutationAction();
  const updateCartQty = useUpdateCart();
  const removeItem = useRemoveCartItem();

  function updateQtyHandler(type: "inc" | "dec") {
    const newQty = type === "dec" ? item.qty - 1 : item.qty + 1;
    if (item.qty > 0) {
      return updateCartQty.mutate({
        itemId: item._id,
        qty: newQty,
      });
    }
  }

  function removeItemHandler() {
    return removeItem.mutate(item._id);
  }

  return (
    <>
      <div className="cartItem">
        <Image
          src={`https://cloudmall-africa.herokuapp.com${item.product.image}`}
          height={100}
          width={100}
          alt={item.product.name}
        />
        <div className="content">
          <div className="layer">
            <div className="group">
              <h4>{item.product.name}</h4>
              <h6 className="store">
                <MapIcon />
                <span>{item.store.name}</span>
              </h6>
            </div>
            <h4 className="price">N {formatPrice(item.product.unitPrice)}</h4>
          </div>
          <div className="layer cart-controls">
            <button type="button" onClick={removeItemHandler}>
              <TrashIcon />
            </button>
            <NoteIcon />
            <div className="controls">
              <button onClick={() => updateQtyHandler("dec")}>
                <SubtractIcon />
              </button>
              <span>
                {item.qty}
                {/* {quantityText} */}
              </span>
              <button type="button" onClick={() => updateQtyHandler("inc")}>
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
            height: 30px;
            width: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
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
            align-items: center;
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
