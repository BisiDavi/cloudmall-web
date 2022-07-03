import Modal from "@/components/modals";
import FormatPrice from "@/utils/FormatPrice";
import Button from "@/components/buttons";
import { ModalProps } from "@/types/modal-types";
import useModal from "@/hooks/useModal";

export default function WalletPaymentModal({
  closeModal,
  showModal,
}: ModalProps) {
  const { updateModalHandler } = useModal();

  return (
    <>
      <Modal closeModal={closeModal} showModal={showModal} persistModal>
        <div>
          <p>
            Wallet balance: <FormatPrice price={10000} />
          </p>
          <p>
            Total Amount: <FormatPrice price={5000} />
          </p>
          <p>
            Balance: <FormatPrice price={5000} />
          </p>
          <div className="buttonGroup">
            <button
              className="itemButton withWallet"
              onClick={() => updateModalHandler(null)}
            >
              Pay with Wallet
            </button>
            <Button
              text="Pay now"
              className="itemButton payNow"
              onClick={() => updateModalHandler(null)}
            />
            <p>Pay with cards,bank transer, etc.</p>
          </div>
        </div>
      </Modal>
      <style global jsx>
        {`
          .withWallet {
            background-color: transparent;
            border: 1px solid var(--mall-blue);
            color: var(--mall-blue);
          }
          .buttonGroup .itemButton {
            height: 40px;
            margin-left: 0px;
            width: 100%;
          }
          .itemButton.payNow {
            margin-top: 40px;
          }
          .buttonGroup p {
            font-size: 12px;
            margin-top: 4px;
          }
        `}
      </style>
    </>
  );
}
