import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useBaseUrl from "@/hooks/useBaseUrl";
import { createUserAddress } from "@/utils/userRequest";
import useToast from "@/hooks/useToast";
import { useAppDispatch } from "@/hooks/useRedux";
import { updateErrorText, updateModal } from "@/redux/ui-slice";

export default function useAddressMutation() {
  const queryClient = useQueryClient();
  const [baseURL] = useBaseUrl();
  const { loadingToast, updateToast } = useToast();
  const dispatch = useAppDispatch();

  const responseData = (toastID: any) => ({
    onMutate: () => {
      loadingToast(toastID);
    },
    onSettled: () => queryClient.invalidateQueries("getUserProfile"),
    onSuccess: (response: any) => {
      updateToast(toastID, "success", response.data.message);
    },
    onError: (err: any) => {
      dispatch(updateErrorText(err?.response?.data?.message));
      dispatch(updateModal("error"));
      updateToast(toastID, "error", "error");
    },
  });

  function useUpdateAddress() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation(
      ({ userDetails }: any) => createUserAddress(baseURL, userDetails),
      {
        mutationKey: "useUpdateAddress",
        ...result,
      }
    );
  }

  function useCreateAddress() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation(
      ({ userDetails }: any) => createUserAddress(baseURL, userDetails),
      {
        mutationKey: "useUpdateAddress",
        ...result,
      }
    );
  }
  return { useUpdateAddress, useCreateAddress };
}
