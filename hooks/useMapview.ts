/* eslint-disable react-hooks/exhaustive-deps */

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";
import { updateLoadMap } from "@/redux/map-slice";

export default function useMapview() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.ui);
  const { loadMap } = useAppSelector((state) => state.map);

  const updateAutocompleteStatus = (status: boolean) =>
    dispatch(updateLoadMap(status));

  function closeModal() {
    dispatch(updateModal(null));
  }

  return {
    closeModal,
    loadMap,
    updateAutocompleteStatus,
    modal,
  };
}
