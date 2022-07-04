import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { deliverySchema } from "@/components/forms/schema/deliverySchema";
import useCheckout from "./useCheckout";
import { useState } from "react";

export default function useDeliveryForm() {
  const [formData, setFormData] = useState(null);
  const { useCheckoutUser } = useCheckout();
  const checkoutUser = useCheckoutUser();

  const methods = useForm({
    resolver: yupResolver(deliverySchema),
  });

  function submitHandler(data: any) {
    setFormData(data);
    console.log("data", data);
    checkoutUser.mutate({
      address: data.address,
      paymentMethod: "FLUTTERWAVE",
      instantDelivery: true,
    });
  }

  function payWithFlutterWave(){
    
  }

  return { methods, submitHandler, formData };
}
