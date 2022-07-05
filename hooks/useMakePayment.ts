import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useAppSelector } from "./useRedux";

export default function useMakePayment() {
  const { payment } = useAppSelector((state) => state.payment);
  const config: any = {
    public_key: payment.fwKey,
    tx_ref: payment.order.txRef,
    amount: payment.order.total,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussed",
    customer: {
      email: "",
      phonenumber: payment.order.phonenumber,
      name: payment.order.name,
    },
    customizations: {
      title: payment.order.title,
      description: payment.order.description,
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
