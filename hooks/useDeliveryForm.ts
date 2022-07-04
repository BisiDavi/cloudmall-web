import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { deliverySchema } from "@/components/forms/schema/deliverySchema";

export default function useDeliveryForm() {
  const [formData, setFormData] = useState(null);

  const methods = useForm({
    resolver: yupResolver(deliverySchema),
  });

  console.log("formData", formData);

  function submitHandler(data: any) {
    setFormData(data);
  }

  return { methods, submitHandler, formData };
}
