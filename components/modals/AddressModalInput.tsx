import type { ChangeEvent } from "react";

import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import { saveIncompleteAddress } from "@/redux/location-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface Props {
  addressValue: { location?: string; title?: string };
  index: number;
}

export default function AddressModalInput({ addressValue, index }: Props) {
  const dispatch = useAppDispatch();
  const { incompleteAddress } = useAppSelector((state) => state.location);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch(
      saveIncompleteAddress({
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
            <p>{addressValue.title}</p>
          </div>
        ) : (
          <BorderlineInput
            placeholder="Address Title - (Home, Work)"
            type="text"
            id="address-title"
            name="addressTitle"
            value={incompleteAddress.title}
            defaultValue={`Untitled-${index}`}
            onChangeHandler={onChangeHandler}
          />
        )}
        <p>{addressValue.location}</p>
      </div>
      <style jsx>{`
        .addressModalInput p {
          margin: 0px 0px 20px 0px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
