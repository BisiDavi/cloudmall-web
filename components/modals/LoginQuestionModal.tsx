import { useRouter } from "next/router";

import Modal from "@/components/modals";
import { ModalProps } from "@/types/modal-types";

export default function LoginQuestionModal({
  closeModal,
  showModal,
}: ModalProps) {
  const router = useRouter();

  function newUserHandler() {
    closeModal();
    return router.push("/delivery-details");
  }

  function oldUserHandler() {
    closeModal();
    return router.push("/auth/login");
  }

  return (
    <>
      <Modal closeModal={closeModal} showModal={showModal}>
        <div className="modal-view">
          <p>Do you have an existing Cloudmall account?</p>
          <div className="button-group">
            <button className="no" onClick={newUserHandler}>
              No
            </button>
            <button className="yes" onClick={oldUserHandler}>
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <style jsx>{`
        .modal-view p {
          padding: 0px;
          margin: 0px;
        }
        .button-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
        }
        .button-group button {
          padding: 10px;
        }
        .button-group .no {
          border: 1px solid var(--mall-blue);
          color: var(--mall-blue);
          background-color: white;
        }
        .button-group .yes {
          background-color: var(--mall-blue);
          color: white;
          border: none;
        }
      `}</style>
    </>
  );
}
