import Modal from "@/components/modals";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalProps } from "@/types/modal-types";


export default function ErrorModal({ showModal, closeModal }: ModalProps) {
  const { errorText } = useAppSelector((state) => state.ui);
  return (
    <Modal closeModal={closeModal} showModal={showModal}>
      {errorText}
    </Modal>
  );
}
