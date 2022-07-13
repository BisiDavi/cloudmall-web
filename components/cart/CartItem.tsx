import Image from "next/image";

import useCartMutationAction from "@/hooks/useCartMutationAction";
import FormatPrice from "@/utils/FormatPrice";
import AddIcon from "@/components/icons/AddIcon";
import MapIcon from "@/components/icons/MapIcon";
import NoteIcon from "@/components/icons/NoteIcon";
import SubtractIcon from "@/components/icons/SubtractIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import useModal from "@/hooks/useModal";
import NoteModal from "../modals/NoteModal";
import { useState } from "react";

interface cartProps {
  item: any;
  index: number;
}

export default function CartItem({ item, index }: cartProps) {
  const { useUpdateCart, useRemoveCartItem } = useCartMutationAction();
  const updateCartQty = useUpdateCart();
  const removeItem = useRemoveCartItem();
  const { modal, updateModalHandler } = useModal();
  const [modalType, setModalType] = useState("");

  function updateQtyHandler(type: "inc" | "dec") {
    const newQty = type === "dec" ? item.qty - 1 : item.qty + 1;
    if (item.qty > 0) {
      return updateCartQty.mutate({
        itemId: item._id,
        qty: newQty,
      });
    }
  }

  function displayNoteModal() {
    updateModalHandler("noteModal");
    setModalType("");
  }

  function removeItemHandler() {
    return removeItem.mutate(item._id);
  }

  return (
    <>
      {modal === "noteModal" && (
        <NoteModal
          showModal={modal}
          closeModal={() => updateModalHandler(null)}
          productName={item.product.name}
        />
      )}
      <div className="cartItem">
        <Image
          src={`https://cloudmall-africa.herokuapp.com${item.product.image}`}
          height={100}
          width={100}
          alt={item.product.name}
          blurDataURL={`https://cloudmall-africa.herokuapp.com${item.product.image}`}
          placeholder="blur"
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
            <h4 className="price">
              <FormatPrice price={item.product.unitPrice} />
            </h4>
          </div>
          <div className="layer cart-controls">
            <button type="button" onClick={removeItemHandler}>
              <TrashIcon />
            </button>
            <button
              type="button"
              onClick={() => updateModalHandler("noteModal")}
            >
              <NoteIcon />
            </button>
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
