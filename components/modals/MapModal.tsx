import Modal from "@/components/modals";
import { useAppSelector } from "@/hooks/useRedux";
import { modalType } from "@/types/modal-types";
import Image from "next/image";
import { memo, useMemo, useState } from "react";
import Input from "../forms/FormElements/Input";

interface Props {
  modal: modalType;
  closeModal: () => void;
}

function MapModalComponent({ modal, closeModal }: Props) {
  const [newAddress, setNewAddress] = useState({
    addressInputArray: { 0: "" },
    count: 0,
  });
  const { address } = useAppSelector((state) => state.location);

  console.log("newAddress", newAddress);

  function newAddressHandler() {
    setNewAddress((prevState) => ({
      ...prevState,
      addressInputArray: {
        ...prevState.addressInputArray,
        [prevState.count + 1]: "",
      },
      count: prevState.count + 1,
    }));
  }

  const input = useMemo(() => {
    const inputValue = {
      placeholder: "Address Title - (Home, Work)",
      type: "text",
      id: "address-title",
      name: "addressTitle",
      borderLine: true,
      defaultValue: "Untitled",
    };
    return inputValue;
  }, []);

  const addressArray = Object.values(newAddress.addressInputArray);

  return (
    <Modal showModal={modal} closeModal={closeModal} persistModal>
      <h6 className="title">Select an Address</h6>
      <div className="content">
        {addressArray.map((_, index) => (
          <div key={`addressView-${index}`} className="addressView">
            <Input input={input} />
            <p>{address}</p>
          </div>
        ))}
        <button type="button" onClick={newAddressHandler}>
          <h3>Enter New Address </h3>{" "}
          <Image src="/addIcon.png" height={14} width={14} alt="add icon" />
        </button>
      </div>
      <style jsx>
        {`
          .content {
            font-family: "Roboto", sans-serif;
            margin-top: 30px;
            font-weight: 500;
          }
          .content h3 {
            color: var(--mall-blue);
          }
          h6.title {
            color: var(--text-color);
            font-size: 14px;
            text-align: center;
            margin-bottom: 20px;
          }
          .content button {
            border: none;
            display: flex;
            background-color: transparent;
          }
          .content button h3 {
            margin-right: 10px;
            font-size: 16px;
          }
          .content p {
            margin: 0px 0px 20px 0px;
          }
        `}
      </style>
    </Modal>
  );
}

const MapModal = memo(MapModalComponent);

export default MapModal;
