/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Ripples from "@/components/loaders/Ripples";
import DefaultLayout from "@/layout/default-layout";
import useMakePayment from "@/hooks/useMakePayment";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { verifyPaymentRequest } from "@/utils/cartRequest";
import { updatePaymentStatus } from "@/redux/payment-slice";
import PaymentView from "@/components/views/PaymentView";
import { updateLogin } from "@/redux/login-slice";

export default function PaymentPage() {
  const { makePayment } = useMakePayment();
  const [loading, setLoading] = useState(true);
  const { payment } = useAppSelector((state) => state.payment);
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);
  const dispatch = useAppDispatch();
  const { order, status } = payment;
  console.log("payment", payment);

  useEffect(() => {
    if (status === null && order !== null) {
      return makePayment(setLoading);
    }
  }, [status, order]);

  useEffect(() => {
    if (payment.status === "FLUTTERWAVE_SUCCESSFUL") {
      verifyPaymentRequest(
        payment.order.initialFees.transactions[0].flutterwave.txRef,
        loginDetails.token
      )
        .then((response) => {
          console.log("verifyPaymentRequest-response", response);
          if (response.data.transaction.status === "SUCCESSFUL") {
            dispatch(
              updatePaymentStatus("FLUTTERWAVE_SUCCESSFUL_AND_VERIFIED")
            );
            dispatch(updateLogin(null));
          }
        })
        .catch((err) => console.log("verifyPaymentRequest-err", err));
    }
  }, [payment.status]);

  return (
    <DefaultLayout title="Make Payment" padding="0px">
      <div className="content">
        {payment.status !== "FLUTTERWAVE_SUCCESSFUL_AND_VERIFIED" ? (
          <div className="redirectingView">
            {loading && <Ripples centerRipple />}
            <h4 className="text-center text-red">
              Redirecting you to payment gateway
            </h4>
          </div>
        ) : (
          <div className="payment-confirmation">
            <PaymentView />
          </div>
        )}
      </div>

      <style jsx>{`
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
