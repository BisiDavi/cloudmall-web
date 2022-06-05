import { PropsWithChildren, useState } from "react";

export default function Modal({ children }: PropsWithChildren<{}>) {
  const [show, setShow] = useState(false);

  const handleModalClose = () => {
    setShow(false);
  };

  const handleModalOpen = () => {
    setShow(true);
  };
  return (
    <div>
      <div hidden={!show}>
        <div className="modal-background" onClick={handleModalClose}>
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
            background-color: rgba(10, 10, 10, 0.86);
          }

          .modal-card {
            margin: 0 auto;
            display: block;
            margin-top: 250px;
            width: 300px;
            height: 300px;
            background-color: lightgray;
            border-radius: 5px;
          }
        `}
      </style>
    </div>
  );
}
