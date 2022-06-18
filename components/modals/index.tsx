import { ModalProps } from "@/types/modal-types";
import { PropsWithChildren } from "react";

export default function Modal({
  children,
  closeModal,
  showModal,
  persistModal,
}: PropsWithChildren<ModalProps>) {
  const modalPersist: any = persistModal ? null : closeModal;
  const modalState = showModal !== null ? true : false;
  return (
    <div>
      <div hidden={!modalState}>
        <div className="modal-background" onClick={modalPersist}>
          <div className="modal-card">{children}</div>
        </div>
      </div>
      <style jsx>
        {`
          .button {
            display: block;
            margin: 0 auto;
            margin-top: 50px;
            border-radius: 6px;
            padding: 20px;
          }

          .modal-background {
            position: absolute;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 100;
            height: 100vh;
            background-color: rgba(10, 10, 10, 0.86);
          }

          .modal-card {
            margin: 20% auto;
            display: block;
            width: 300px;
            height: auto;
            background-color: white;
            border-radius: 5px;
            padding: 20px;
          }
        `}
      </style>
    </div>
  );
}
