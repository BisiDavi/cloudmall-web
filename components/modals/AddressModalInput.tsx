/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";

import BorderlineInput from "@/components/forms/FormElements/BorderlineInput";
import { saveUserAddress } from "@/redux/location-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";

interface Props {
  addressValue: { title: string; location: string };
  index: number;
}

type stateType = {
  title: string;
  inputPosition: number | null;
};

export default function AddressModalInput({ addressValue, index }: Props) {
  const [addressTitle, setAddressTitle] = useState<stateType>({
    title: "",
    inputPosition: null,
  });
  const { address } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  function inputHandler(inputAddressTitle: string) {
    let addressTemp = address;
    const selectedAddress = addressTemp[index];
    const edittedAddress = { ...selectedAddress, title: inputAddressTitle };
    dispatch(saveUserAddress(edittedAddress));
  }

  useEffect(() => {
    if (index === addressTitle.inputPosition) {
      inputHandler(addressTitle.title);
    }
  }, [addressTitle.title]);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setAddressTitle({
      title: e.target.value,
      inputPosition: index,
    });
  }

  return (
    <>
      <BorderlineInput
        placeholder="Address Title - (Home, Work)"
        type="text"
        id="address-title"
        name="addressTitle"
        value={addressTitle.title}
        defaultValue={`Untitled-${index}`}
        onChangeHandler={onChangeHandler}
      />
      <p>{addressValue.location}</p>
    </>
  );
}
