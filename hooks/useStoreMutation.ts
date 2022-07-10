import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import { useAppDispatch } from "@/hooks/useRedux";
import useStoreRequest from "./useStoreRequest";

export default function useStoreMutation() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { listStore } = useStoreRequest();

  function useStoreUpdate() {
    const toastID = useRef(null);

    return useMutation();
  }

  return {
    useStoreUpdate,
  };
}
