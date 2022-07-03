import type { ChangeEvent } from "react";

import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import { saveIncompleteAddress } from "@/redux/location-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface Props {
  addressValue: { location?: string; title?: string };
}

export default function AddressModalInput({ addressValue }: Props) {
  const dispatch = useAppDispatch();
  const { incompleteAddress } = useAppSelector((state) => state.location);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      saveIncompleteAddress({
        ...incompleteAddress,
        title: e.target.value,
        location: addressValue.location,
      })
    );
  }
  return (
    <>
      <div className="addressModalInput">
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
            value={incompleteAddress.title}
            onChangeHandler={onChangeHandler}
          />
        )}
        <p>{addressValue.location}</p>
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
      `}</style>
    </>
  );
}
