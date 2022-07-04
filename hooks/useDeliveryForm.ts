import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliverySchema } from "@/components/forms/schema/deliverySchema";
import useCheckout from "./useCheckout";

export default function useDeliveryForm() {
  const { useCheckoutUser } = useCheckout();
  const checkoutUser = useCheckoutUser();
  const methods = useForm({
    resolver: yupResolver(deliverySchema),
  });

  function submitHandler(data: any) {
    console.log("data", data);
  }

  return { methods, submitHandler };
}
