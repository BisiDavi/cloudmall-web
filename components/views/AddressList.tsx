import { useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import BorderlineInput from "../forms/FormElements/BorderlineInput";
import SaveIcon from "../icons/SaveIcon";

interface AddressProps {
  address: {
    _id: string;
    type: string;
    address: string;
  };
}

export default function AddressList({ address }: AddressProps) {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(address.type);

  function inputHandler(e: any) {
    setTitle(e.target.value);
  }

  function editHandler() {
    setEditTitle(true);
  }

  function saveHandler() {
    setEditTitle(false);
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
        </div>
        <div className="buttonGroup">
          <button type="button" onClick={updateList}>
            {!editTitle ? <EditIcon /> : <SaveIcon />}
          </button>
          <button type="button">
            <TrashIcon />
          </button>
        </div>
      </div>
      <style jsx>{`
        .user-address {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .buttonGroup {
          display: flex;
          flex-direction: column;
        }
        .buttonGroup button {
          margin: 5px 0px;
          background-color: var(--mall-blue);
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
          height: 35px;
          width: 35px;
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
