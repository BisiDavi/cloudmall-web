export interface ModalProps {
  closeModal: () => void;
  showModal: modalType;
  persistModal?: boolean;
}

export type modalType =
  | "loginQuestionModal"
  | "paymentModal"
  | "noteModal"
  | null;
