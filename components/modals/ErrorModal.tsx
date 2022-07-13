import Modal from "@/components/modals";
import { useAppSelector } from "@/hooks/useRedux";
import { ModalProps } from "@/types/modal-types";

export default function ErrorModal({ showModal, closeModal }: ModalProps) {
  const { errorText } = useAppSelector((state) => state.ui);

  console.log("errorMessage", errorText);
  return (
    <Modal closeModal={closeModal} showModal={showModal}>
      <div
        className="text-content"
        dangerouslySetInnerHTML={{ __html: errorText }}
      />
      <style jsx>{`
        .text-content {
          white-space: break-spaces;
        }
      `}</style>
    </Modal>
  );
}
