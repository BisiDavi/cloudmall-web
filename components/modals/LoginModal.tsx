import Modal from "@/components/modals";

export default function LoginModal() {
  return (
    <>
      <Modal>
        <p>Do you have an existing Cloudmall account?</p>
        <div className="button-group">
          <button className="no">No</button>
          <button className="yes">Yes</button>
        </div>
      </Modal>
      <style jsx>{`
        .button-group {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .button-group button {
          padding: 10px;
        }
        .button-group .no {
          border: 1px solid var(--mall-blue);
          color: var(--mall-blue);
        }
        .button-group .no {
          background-color: var(--mall-blue);
          color: white;
        }
      `}</style>
    </>
  );
}
