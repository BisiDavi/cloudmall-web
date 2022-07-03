import Modal from "@/components/modals";
import { ModalProps } from "@/types/modal-types";
import FormatPrice from "@/utils/formatPrice";
import Button from "@/components/buttons";

export default function WalletPaymentModal({
  closeModal,
  showModal,
}: ModalProps) {
  return (
    <Modal closeModal={closeModal} showModal={showModal}>
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
          <Button text="Pay with Wallet" />
          <Button text="Pay now" />
          <p>Pay with cards,bank transer, etc.</p>
        </div>
      </div>
    </Modal>
  );
}
