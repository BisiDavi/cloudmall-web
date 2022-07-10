/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import Ripples from "@/components/loaders/Ripples";
import DefaultLayout from "@/layout/default-layout";
import useMakePayment from "@/hooks/useMakePayment";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import useCartRequest from "@/hooks/useCartRequest";
import { updatePaymentStatus } from "@/redux/payment-slice";
import PaymentView from "@/components/views/PaymentView";
import { updateLogin } from "@/redux/login-slice";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function PaymentPage() {
  const { makePayment } = useMakePayment();
  const { verifyPaymentRequest } = useCartRequest();
  //   const [loading, setLoading] = useState(true);
  const { payment } = useAppSelector((state) => state.payment);
  const [baseURL] = useBaseUrl();
  const dispatch = useAppDispatch();
  const { order, status, paymentInitiased } = payment;

  //   useEffect(() => {
  if (status === null && order !== null && !paymentInitiased) {
    makePayment();
  }
  //   }, [status, order]);

  function verifyPayment() {
    return verifyPaymentRequest(
      baseURL,
      payment.order.initialFees.transactions[0].flutterwave.txRef
    )
      .then((response) => {
        console.log("verifyPaymentRequest-response", response);
        if (response.data.transaction.status === "SUCCESSFUL") {
          dispatch(updatePaymentStatus("FLUTTERWAVE_SUCCESSFUL_AND_VERIFIED"));
          dispatch(updateLogin(null));
        }
      })
      .catch((err) => {
        console.log("verifyPaymentRequest-err", err);
        if (err) {
          verifyPayment();
        }
      });
  }

  useEffect(() => {
    if (payment.status === "FLUTTERWAVE_SUCCESSFUL") {
      verifyPayment();
    }
  }, [payment.status]);

  return (
    <DefaultLayout title="Make Payment" padding="0px">
      <div className="content">
        {payment.status !== "FLUTTERWAVE_SUCCESSFUL_AND_VERIFIED" ? (
          <div className="redirectingView">
            <Ripples centerRipple />
            <h4 className="text-center text-red">
              Redirecting you to payment gateway...
            </h4>
          </div>
        ) : (
          <div className="payment-confirmation">
            <PaymentView />
          </div>
        )}
      </div>

      <style jsx>{`
        .redirectingView {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .content {
          display: flex;
          align-items: center;
          margin: auto;
          flex-direction: column;
        }
        .payment-confirmation {
          margin: 10px 30px;
        }
      `}</style>
    </DefaultLayout>
  );
}
