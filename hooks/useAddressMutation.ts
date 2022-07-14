import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import useToast from "@/hooks/useToast";
import useAddressRequest from "@/hooks/useAddressRequest";

export default function useAddressMutation() {
  const queryClient = useQueryClient();
  const { createUserAddress, updateUserAddress, deleteUserAddress } =
    useAddressRequest();
  const { loadingToast, updateToast } = useToast();

  const responseData = (toastID: any) => ({
    onMutate: () => {
      loadingToast(toastID);
    },
    onSettled: () => queryClient.invalidateQueries("getUserProfile"),
    onSuccess: (response: any) => {
      updateToast(toastID, "success", response.data.message);
    },
    onError: (err: any) => {
      updateToast(toastID, "error", err?.response?.data?.message);
    },
  });

  function useUpdateAddress() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation((userDetails: any) => updateUserAddress(userDetails), {
      mutationKey: "useUpdateAddress",
      ...result,
    });
  }

  function useDeleteAddress() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation((addressId: any) => deleteUserAddress(addressId), {
      mutationKey: "useDeleteAddress",
      ...result,
    });
  }

  function useCreateAddress() {
    const toastID = useRef(null);
    const result = responseData(toastID);

    return useMutation((userDetails: any) => createUserAddress(userDetails), {
      mutationKey: "useCreateAddress",
      ...result,
    });
  }
  return { useUpdateAddress, useCreateAddress, useDeleteAddress };
}
