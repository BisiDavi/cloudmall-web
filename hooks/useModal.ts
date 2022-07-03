import { updateModal } from "@/redux/ui-slice";
import { modalType } from "@/types/modal-types";
import { useAppDispatch, useAppSelector } from "./useRedux";

export default function useModal() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.ui);

  function updateModalHandler(type: modalType) {
    dispatch(updateModal(type));
  }

  return { updateModalHandler, modal };
}
