import Modal from "@/components/modals";
import useCartMutationAction from "@/hooks/useCartMutationAction";
import { ModalProps } from "@/types/modal-types";
import { useState } from "react";

interface Props extends ModalProps {
  productName: string;
  item: any;
}

export default function NoteModal({
  productName,
  closeModal,
  showModal,
  item,
}: Props) {
  const [noteText, setNoteText] = useState("");
  const { useUpdateCart } = useCartMutationAction();
  const updateCartItemNote = useUpdateCart();

  function cancelHandler() {
    closeModal();
  }

  function updateNoteChanges(e: any) {
    setNoteText(e.target.value);
  }

  function saveHandler() {
    updateCartItemNote.mutate({ itemId: item._id, note: noteText });
    closeModal();
  }

  const buttonGroup = [
    { text: "Cancel", func: cancelHandler },
    { text: "Save", func: saveHandler },
  ];

  const value = item?.note ? item.note : "";

  return (
    <Modal closeModal={closeModal} showModal={showModal} persistModal>
      <div className="content">
        <h6>Add a note - {productName}</h6>
        <textarea onChange={updateNoteChanges} rows={5}>
          {value}
        </textarea>
        <div className="buttonGroup">
          {buttonGroup.map((buttonItem, index) => (
            <button
              key={index}
              className={`itemButton ${buttonItem.text}`}
              onClick={() => buttonItem.func()}
            >
              {buttonItem.text}
            </button>
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .content {
            display: flex;
            flex-direction: column;
          }
          .content h6 {
            margin-bottom: 10px;
            font-size: 12px;
            font-weight: 500;
          }
          .buttonGroup {
            display: flex;
            margin-top: 10px;
            padding: 0px;
            justify-content: space-between;
          }
          .buttonGroup button {
            border: 1px solid var(--mall-blue);
            padding: 5px;
            margin-left: 0px;
            width: 70px;
            height: 40px;
          }
          .buttonGroup button.Cancel {
            border: 1px solid var(--mall-blue);
            background-color: transparent;
            color: var(--mall-blue);
          }
          .buttonGroup button.Save {
            background-color: var(--mall-blue);
          }
        `}
      </style>
    </Modal>
  );
}
