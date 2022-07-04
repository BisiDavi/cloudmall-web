import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { deliverySchema } from "@/components/forms/schema/deliverySchema";

export default function useDeliveryForm() {
  const methods = useForm({
    resolver: yupResolver(deliverySchema),
  });

  return { methods };
}
