import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

import useToast from "@/hooks/useToast";
import { checkoutFlowRequest, checkoutUserRequest } from "@/utils/cartRequest";
import { checkoutDetailsType } from "@/types/cart-type";
import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/hooks/useRedux";
import { getFlutterwaveKeys } from "@/utils/utilsRequest";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const toastID = useRef(null);
  const { updateModalHandler } = useModal();
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);

  const { loadingToast, updateToast } = useToast();

  function checkoutUser(checkoutDetails: checkoutDetailsType) {
    loadingToast(toastID);
    getFlutterwaveKeys()
      .then((fwKeysResponse) => {
        console.log("getFlutterwaveKeys-response", fwKeysResponse);
        return checkoutUserRequest(checkoutDetails, loginDetails.token)
          .then((checkoutUserResponse) => {
            console.log("response-checkoutUserRequest", checkoutUserResponse);
            updateToast(
              toastID,
              "success",
              checkoutUserResponse?.data?.message
            );
            updateModalHandler(null);
            return checkoutUserResponse.data;
          })
          .then((checkoutResponse) => {
            const handlerFlutterPayment = useFlutterwave({
              public_key: fwKeysResponse.data.public,
              tx_ref:
                checkoutResponse.order.initialFees.transactions[0].flutterwave
                  .txRef,
              amount: checkoutResponse.order.initialFees.total,
              currency: "NGN",
              payment_options: "card,mobilemoney,ussed",
              customer: {
                email: "",
                phonenumber: checkoutResponse.order.user.phonenumber,
                name: `${checkoutResponse.order.user.surname} ${checkoutResponse.order.user.firstname}`,
              },
              customizations: {
                title: "",
                description: "",
                logo: "",
              },
            });
            handlerFlutterPayment({
              callback: (response) => {
                console.log("response-fw-callback", response);
                closePaymentModal();
              },
              onClose: () => {},
            });
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
          {
            address,
            paymentMethod,
            note,
            instantDelivery,
            eta,
            voucher,
          },
          loginDetails.token
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
          {
            address,
            paymentMethod,
            note,
            instantDelivery,
            eta,
            voucher,
          },
          loginDetails.token
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
          console.log("response", response);
          updateToast(toastID, "success", response.data.message);
          updateModalHandler(null);
        },
        onError: (err: any) => {
          console.log("err", err);
          updateToast(toastID, "error", err?.response?.data?.message);
          updateModalHandler(null);
        },
      }
    );
  }

  return { useCheckoutUser, useCheckoutCustomer, checkoutUser };
}
