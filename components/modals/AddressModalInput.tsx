import { ChangeEvent, useState } from "react";

import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import useAddressMutation from "@/hooks/useAddressMutation";
import SaveIcon from "@/components/icons/SaveIcon";

interface Props {
  addressValue: { location?: string; title?: string; lat: string; lng: string };
}

export default function AddressModalInput({ addressValue }: Props) {
  const [title, setTitle] = useState("");
  const { useCreateAddress } = useAddressMutation();
  const createAddress = useCreateAddress();

  console.log("addressValue", addressValue);

  function createAddressHandler() {
    createAddress.mutate({
      type: title.toUpperCase(),
      coordinates: [addressValue.lng, addressValue.lat],
      address: addressValue.location,
      isDefault: true,
    });
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  return (
    <>
      <div className="addressModalInput">
        <div className="text-view">
          {addressValue.title ? (
            <div className="addressview">
              <h5>{addressValue.title.toUpperCase()}</h5>
            </div>
          ) : (
            <BorderlineInput
              placeholder="Address Title - (Home, Work)"
              type="text"
              id="address-title"
              name="addressTitle"
              value={title}
              onChangeHandler={onChangeHandler}
            />
          )}
          <p>{addressValue.location}</p>
        </div>
        {title.length > 2 && (
          <button
            className="saveIcon"
            type="button"
            onClick={createAddressHandler}
          >
            <SaveIcon />
          </button>
        )}
      </div>
      <style jsx>{`
        .addressModalInput p {
          margin: 0px 0px 10px 0px;
          font-size: 12px;
        }
        .addressModalInput h5 {
          margin-bottom: 5px;
          color: var(--mall-blue);
        }
        .addressModalInput {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .text-view {
          width: 80%;
        }

        button.saveIcon {
          border: none;
          background-color: var(--mall-blue);
          height: 30px;
          width: 30px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}
