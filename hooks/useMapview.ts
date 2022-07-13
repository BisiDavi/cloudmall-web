/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";

export default function useMapview() {
  const dispatch = useAppDispatch();
  const [loadAutocomplete, setLoadAutocomplete] = useState(false);
  const { modal } = useAppSelector((state) => state.ui);
  //   const {  } = useAppSelector((state) => state.location);

  const updateAutocompleteStatus = (status: boolean) =>
    setLoadAutocomplete(status);

  function closeModal() {
    dispatch(updateModal(null));
  }

  return {
    closeModal,
    loadAutocomplete,
    updateAutocompleteStatus,
    modal,
  };
}
