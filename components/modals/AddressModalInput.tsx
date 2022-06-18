/* eslint-disable react-hooks/exhaustive-deps */
import type { ChangeEvent } from "react";

import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import { updateAddressTitle } from "@/redux/location-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface Props {
  addressValue: { location: string; index: number };
  index: number;
}

export default function AddressModalInput({ addressValue, index }: Props) {
  const { addressTitle } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    dispatch(updateAddressTitle({ title: e.target.value, index }));
  }

  return (
    <>
      <div className="addressModalInput">
        <BorderlineInput
          placeholder="Address Title - (Home, Work)"
          type="text"
          id="address-title"
          name="addressTitle"
          value={addressTitle[index].title}
          defaultValue={`Untitled-${index}`}
          onChangeHandler={onChangeHandler}
        />
        <p>{addressValue.location}</p>
      </div>
      <style jsx>{`
        .addressModalInput p {
          margin: 0px 0px 20px 0px;
          font-size: 12px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
