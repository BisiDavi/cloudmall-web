import Modal from "@/components/modals";
import Image from "next/image";
import { memo } from "react";
import type { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { modalType } from "@/types/modal-types";
import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import { updateModal } from "@/redux/ui-slice";
import { saveUserAddress } from "@/redux/location-slice";

interface Props {
  modal: modalType;
  closeModal: () => void;
}

function MapModalComponent({ modal, closeModal }: Props) {
  const dispatch = useAppDispatch();

  const { address } = useAppSelector((state) => state.location);

  function newAddressHandler() {
    dispatch(updateModal(null));
  }

  console.log("address", address);

  function inputHandler(e: ChangeEvent<HTMLInputElement>, location: string) {
    const selectedAddressArray = address.filter(
      (addr) => addr.location === location
    );
    let selectedAddress = selectedAddressArray[0];
    const edittedAddress = { ...selectedAddress, title: e.target.value };
    dispatch(saveUserAddress(edittedAddress));
  }

  return (
    <Modal showModal={modal} closeModal={closeModal} persistModal>
      <div className="map-content">
        <h6 className="title">Select an Address</h6>
        <div className="content">
          {address.map((addressValue, index) => {
            const inputIndex = index + 1;
            return (
              <div key={`addressView-${index}`} className="addressView">
                <BorderlineInput
                  placeholder="Address Title - (Home, Work)"
                  type="text"
                  id="address-title"
                  name="addressTitle"
                  value={address[index].title}
                  defaultValue={`Untitled-${inputIndex}`}
                  onChangeHandler={inputHandler}
                />
                <p>{addressValue.location}</p>
              </div>
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
          .content p {
            margin: 0px 0px 20px 0px;
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