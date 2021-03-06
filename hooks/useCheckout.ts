import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { checkoutDetailsType } from "@/types/cart-type";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateFWKeys, updateOrder } from "@/redux/payment-slice";
import useBaseUrl from "@/hooks/useBaseUrl";
import useCartRequest from "@/hooks/useCartRequest";
import { updateErrorText, updateModal } from "@/redux/ui-slice";

export default function useCheckout() {
  const { getFlutterwaveKeys, checkoutFlowRequest, checkoutUserRequest } =
    useCartRequest();
  const queryClient = useQueryClient();
  const toastID = useRef(null);
  const { updateModalHandler } = useModal();
  const [baseURL] = useBaseUrl();
  const { cart }: any = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loadingToast, updateToast } = useToast();

  function checkoutUser(checkoutDetails: checkoutDetailsType) {
    loadingToast(toastID);
    getFlutterwaveKeys(baseURL)
      .then((fwKeysResponse: any) => {
        dispatch(updateFWKeys(fwKeysResponse.data.public));
        return checkoutUserRequest(baseURL, checkoutDetails)
          .then((checkoutUserResponse: any) => {
            dispatch(updateOrder(checkoutUserResponse.data.order));
            updateToast(
              toastID,
              "success",
              checkoutUserResponse?.data?.message
            );
            updateModalHandler(null);
          })
          .then((erev: any) => {
            console.log("errev", erev);
            if (checkoutDetails.paymentMethod === "FLUTTERWAVE") {
              return router.push("/payment");
            }
          })
          .catch((err: any) => {
            updateToast(toastID, "error", "error");
            dispatch(updateErrorText(err?.response?.data?.message));
            dispatch(updateModal("error"));
          });
      })
      .catch((err: any) => {
        console.log("getFlutterwaveKeys-error", err);
        updateToast(toastID, "error", err?.response?.data?.message);
        updateModalHandler(null);
      });
  }

  function useCheckoutCustomer() {
    return useMutation(
      ({
        address,
        paymentMethod,
        note,
        instantDelivery,
        eta,
        voucher,
      }: checkoutDetailsType) =>
        checkoutFlowRequest(baseURL, {
          address,
          paymentMethod,
          note,
          instantDelivery,
          byWhatsapp: true,
          eta,
          voucher,
          cartId: cart[0].cartId,
        }),
      {
        mutationKey: "useCheckoutCustomer",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("getCartQuery");
        },
        onSuccess: (data: any) => {
          console.log("response-data", data);
          updateToast(toastID, "success", data?.response?.message);

          updateModalHandler(null);
        },
        onError: (data: any) => {
          updateToast(toastID, "error", "");
          dispatch(updateErrorText(data?.response?.data?.message));
          dispatch(updateModal("error"));
        },
      }
    );
  }

  function useCheckoutUser() {
    return useMutation(
      ({
        address,
        paymentMethod,
        note,
        instantDelivery,
        eta,
        voucher,
      }: checkoutDetailsType) =>
        checkoutUserRequest(baseURL, {
          address,
          paymentMethod,
          note,
          instantDelivery,
          eta,
          byWhatsapp: true,
          voucher,
          cartId: cart[0].cartId,
        }),
      {
        mutationKey: "useCheckoutUser",
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("getCartQuery");
        },
        onSuccess: (response: any) => {
          updateToast(toastID, "success", response.data.message);
          updateModalHandler(null);
        },
        onError: (err: any) => {
          updateToast(toastID, "error", "error");
          dispatch(updateErrorText(err?.response?.data?.message));
          dispatch(updateModal("error"));
        },
      }
    );
  }

  return { useCheckoutUser, useCheckoutCustomer, checkoutUser };
}
