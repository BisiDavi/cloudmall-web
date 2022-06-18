import Modal from "@/components/modals";
import Image from "next/image";
import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { modalType } from "@/types/modal-types";
import { updateModal } from "@/redux/ui-slice";
import AddressModalInput from "./AddressModalInput";
import {
  resetCount,
  updateCount,
  updateTempAddress,
} from "@/redux/location-slice";

interface Props {
  modal: modalType;
  closeModal: () => void;
}

function MapModalComponent({ modal, closeModal }: Props) {
  const dispatch = useAppDispatch();

  const { address } = useAppSelector((state) => state.location);

  console.log("address", address);

  function newAddressHandler() {
    dispatch(updateTempAddress(""));
    dispatch(updateModal(null));
    dispatch(updateCount());
  }

  function complete() {
    dispatch(resetCount());
    dispatch(updateModal(null));
  }

  return (
    <Modal showModal={modal} closeModal={closeModal} persistModal>
      <div className="map-content">
        <h6 className="title">Select an Address</h6>
        <div className="content">
          {address.map((addressValue, index) => {
            return (
              <AddressModalInput
                key={`addressView-${index}`}
                index={index}
                addressValue={addressValue}
              />
            );
          })}
          <div className="button-group">
            <button type="button" onClick={newAddressHandler}>
              <span>Enter New Address </span>
              <Image src="/addIcon.png" height={14} width={14} alt="add icon" />
            </button>
            <button
              type="button"
              className="complete"
              // onClick={newAddressHandler}
            >
              Complete
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .map-content {
            max-height: 350px;
            overflow-y: scroll;
          }
          .content {
            font-family: "Roboto", sans-serif;
            margin-top: 30px;
            font-weight: 500;
          }
          .content button span,
          .content button {
            color: var(--mall-blue);
            margin-right: 10px;
            font-size: 16px;
            font-weight: 800;
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
          }
          .button-group {
            display: flex;
            flex-direction: column;
            justify-items: center;
            margin: auto;
            align-items: center;
          }
          .button-group button {
            margin: 10px 0px;
          }
          .content button.complete {
            border: 1px solid var(--mall-blue);
            width: 100%;
            text-align: center;
            display: flex;
            margin: auto;
            padding: 8px;
            justify-content: center;
            border-radius: 5px;
            margin-top: 10px;
          }
          .content button.complete:focus {
            background-color: var(--mall-blue);
            color: white;
          }
        `}
      </style>
    </Modal>
  );
}

const MapModal = memo(MapModalComponent);

export default MapModal;
