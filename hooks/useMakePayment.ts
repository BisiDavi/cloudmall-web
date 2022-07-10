import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updatePaymentFlow, updatePaymentStatus } from "@/redux/payment-slice";
import { clearCart } from "@/redux/cart-slice";

export default function useMakePayment() {
  const { payment } = useAppSelector((state) => state.payment);
  const { loginDetails }: any = useAppSelector((state) => state.loginDetails);
  const dispatch = useAppDispatch();

  const config: any = {
    public_key: payment?.fwKey,
    tx_ref: payment?.order?.initialFees.transactions[0].flutterwave.txRef,
    amount: payment?.order?.initialFees.total,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: loginDetails?.user?.email
        ? loginDetails?.user?.email
        : "cloudmallnigeria@gmail.com",
      phonenumber: payment?.order?.user.phonenumber,
      name: `${payment?.order?.user.surname} ${payment?.order?.user.firstname}`,
    },
    customizations: {
      title: "Order Payment",
      description: "",
      logo: "",
    },
  };
  console.log("makePayment-config", config);

  const handlerFlutterPayment = useFlutterwave(config);

  const makePayment = () => {
    dispatch(updatePaymentFlow(true));
    return handlerFlutterPayment({
      callback: (response) => {
        // setLoading(false);
        console.log("response-fw-callback", response);
        if (response.status === "successful") {
          dispatch(updatePaymentStatus("FLUTTERWAVE_SUCCESSFUL"));
          dispatch(clearCart());
        }
        return closePaymentModal();
      },
      onClose: () => dispatch(updatePaymentFlow(false)),
    });
  };

  return { makePayment };
}
