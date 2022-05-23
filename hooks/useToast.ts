import type { MutableRefObject } from "react";
import { toast } from "react-toastify";

export default function useToast() {
  const loadingToast = (toastId: MutableRefObject<any>) =>
    (toastId.current = toast("Processing ...", {
      isLoading: true,
      autoClose: false,
    }));

  const updateToast = (
    toastId: MutableRefObject<any>,
    toastType: any,
    message: string
  ) =>
    toast.update(toastId.current, {
      type: toastType,
      autoClose: 500,
      render: message,
      isLoading: false,
    });

  return {
    loadingToast,
    updateToast,
  };
}
