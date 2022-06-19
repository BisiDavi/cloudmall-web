/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";
import getCurrentLocation from "@/utils/getCurrentLocation";

export default function useMapview() {
  const dispatch = useAppDispatch();
  const [loadAutocomplete, setLoadAutocomplete] = useState(false);
  const { modal } = useAppSelector((state) => state.ui);
  const { useUserCurrentLocation } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (!useUserCurrentLocation) {
      getCurrentLocation(dispatch);
    }
  }, [useUserCurrentLocation]);

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
