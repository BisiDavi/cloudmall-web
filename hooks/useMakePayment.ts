import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useAppSelector } from "@/hooks/useRedux";

export default function useMakePayment() {
  const { payment } = useAppSelector((state) => state.payment);
  const config: any = {
    public_key: payment.fwKey,
    tx_ref: payment.order.initialFees.transactions[0].flutterwave.txRef,
    amount: payment.order.initialFees.total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussed",
    customer: {
      email: "",
      phonenumber: payment.order.user.phonenumber,
      name: `${payment.order.user.surname} ${payment.order.user.firstname}`,
    },
    customizations: {
      title: "Order Payment",
      description: "",
      logo: "",
    },
  };
  const handlerFlutterPayment = useFlutterwave(config);

  function makePayment() {
    return handlerFlutterPayment({
      callback: (response) => {
        console.log("response-fw-callback", response);
        closePaymentModal();
      },
      onClose: () => {},
    });
  }
  return { makePayment };
}
