import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { useRouter } from "next/router";

import useToast from "@/hooks/useToast";
import { checkoutFlowRequest, checkoutUserRequest } from "@/utils/cartRequest";
import { checkoutDetailsType } from "@/types/cart-type";
import useModal from "@/hooks/useModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getFlutterwaveKeys } from "@/utils/utilsRequest";
import { updateFWKeys, updateOrder } from "@/redux/payment-slice";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const toastID = useRef(null);
  const { updateModalHandler } = useModal();
  const baseURL = useBaseUrl();
  const { user }: any = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loadingToast, updateToast } = useToast();

  function checkoutUser(checkoutDetails: checkoutDetailsType) {
    loadingToast(toastID);
    getFlutterwaveKeys(baseURL)
      .then((fwKeysResponse) => {
        console.log("getFlutterwaveKeys-response", fwKeysResponse);
        dispatch(updateFWKeys(fwKeysResponse.data.public));
        return checkoutUserRequest(baseURL, checkoutDetails, user.token)
          .then((checkoutUserResponse) => {
            console.log("response-checkoutUserRequest", checkoutUserResponse);
            dispatch(updateOrder(checkoutUserResponse.data.order));
            updateToast(
              toastID,
              "success",
              checkoutUserResponse?.data?.message
            );
            updateModalHandler(null);
          })
          .then((erev) => {
            console.log("errev", erev);
            if (checkoutDetails.paymentMethod === "FLUTTERWAVE") {
              return router.push("/payment");
            }
          })
          .catch((err) => {
            console.log("err-checkoutUserRequest", err);
            updateToast(toastID, "error", err?.response?.data?.message);
            updateModalHandler(null);
          });
      })
      .catch((err) => {
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
        checkoutFlowRequest(
          baseURL,
          {
            address,
            paymentMethod,
            note,
            instantDelivery,
            eta,
            voucher,
          },
          user.token
        ),
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
          console.log("data-err", data);
          updateToast(toastID, "error", data?.response?.data?.message);
          updateModalHandler(null);
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
        checkoutUserRequest(
          baseURL,
          {
            address,
            paymentMethod,
            note,
            instantDelivery,
            eta,
            voucher,
          },
          user.token
        ),
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
          updateToast(toastID, "error", err?.response?.data?.message);
          updateModalHandler(null);
        },
      }
    );
  }

  return { useCheckoutUser, useCheckoutCustomer, checkoutUser };
}
