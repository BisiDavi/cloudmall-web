import Input from "@/components/forms/FormElements/Input";
import PasswordInput from "@/components/forms/FormElements/PasswordInput";
import Select from "@/components/forms/FormElements/Select";

export default function SelectFormElement({ input }: any) {
  switch (input.elementType) {
    case "input":
      return <Input input={input} />;
    case "password":
      return <PasswordInput input={input} />;
    case "select":
      return <Select input={input} />;
    case "deliveryTime":
      return <div></div>;
    default:
      return null;
  }
}
