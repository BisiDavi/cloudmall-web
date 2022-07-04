import { useFormContext } from "react-hook-form";

import Select from "@/components/forms/FormElements/Select";
import Input from "@/components/forms/FormElements/Input";

export default function DeliveryCategory({ input }: any) {
  const { getValues } = useFormContext();

  const selectedValue = getValues("category");
  const displayInput = selectedValue === "others" ? true : false;
  return (
    <>
      {displayInput ? (
        <Input input={input.inputValue} />
      ) : (
        <Select input={input} />
      )}
    </>
  );
}
