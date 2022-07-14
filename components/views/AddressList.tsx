/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react";

import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import SaveIcon from "@/components/icons/SaveIcon";
import useAddressMutation from "@/hooks/useAddressMutation";

interface AddressProps {
  address: {
    _id: string;
    type: string;
    address: string;
    isDefault: boolean;
  };
}

export default function AddressList({ address }: AddressProps) {
  const [editTitle, setEditTitle] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(address.isDefault);
  const [title, setTitle] = useState(address.type);
  const { useCreateAddress, useDeleteAddress, useUpdateAddress } =
    useAddressMutation();
  const updateAddress = useUpdateAddress();
  const deleteAddress = useDeleteAddress();
  const createAddress = useCreateAddress();

  function inputHandler(e: any) {
    setTitle(e.target.value);
  }

  function editHandler() {
    setEditTitle(true);
  }

  function deleteAddressHandler() {
    deleteAddress.mutate({ addressId: address._id });
  }

  function saveHandler() {
    setEditTitle(false);
    updateAddress.mutate({
      isDefault: true,
      type: title.toUpperCase(),
      addressId: address._id,
      address: address.address,
    });
  }

  const updateList = !editTitle ? editHandler : saveHandler;
  return (
    <div className="view">
      <div className="user-address" key={address._id}>
        <div className="text-view">
          {!editTitle ? (
            <h5>{address.type}</h5>
          ) : (
            <BorderlineInput
              placeholder="Address Title - (Home, Work)"
              type="text"
              id="address-title"
              name="addressTitle"
              value={title}
              onChangeHandler={inputHandler}
            />
          )}
          <p>{address.address}</p>
          <div className="checkbox">
            <input
              id="addressDefault"
              type="checkbox"
              defaultChecked={defaultAddress}
            />
            <label htmlFor="addressDefault">Make default</label>
          </div>
        </div>
        <div className="buttonGroup">
          <button type="button" className="edit" onClick={updateList}>
            {!editTitle ? <EditIcon /> : <SaveIcon />}
          </button>
          <button type="button" onClick={deleteAddressHandler}>
            <TrashIcon />
          </button>
        </div>
      </div>
      <style jsx>{`
        .view {
          border-bottom: 1px solid var(--neutral-gray);
          padding-bottom: 5px;
          margin-bottom: 10px;
        }
        .user-address {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .buttonGroup {
          display: flex;
          flex-direction: column;
        }
        .buttonGroup button.edit {
          margin-bottom: 5px;
        }
        .buttonGroup button {
          background-color: var(--mall-blue);
        }
        .checkbox {
          display: flex;
          align-items: center;
        }
        .view label {
          font-size: 12px;
          margin-left: 3px;
        }
        .view p {
          margin: 0px 0px 10px 0px;
          font-size: 12px;
        }
        .view h5 {
          margin-bottom: 5px;
          color: var(--mall-blue);
        }
        .text-view {
          width: 80%;
        }
        .view button {
          border: 1px solid var(--mall-blue);
          background-color: transparent;
          border-radius: 50%;
          height: 30px;
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .view button {
          background-color: var(--mall-blue);
        }
      `}</style>
    </div>
  );
}
