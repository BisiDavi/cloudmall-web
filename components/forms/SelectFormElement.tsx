import Input from "./FormElements/Input";
import Select from "./FormElements/Select";

export default function SelectFormElement({ input }: any) {
  switch (input.elementType) {
    case "input":
      return <Input input={input} />;
    case "select":
      return <Select input={input} />;
    case "deliveryTime":
      return <div></div>;
    default:
      return null;
  }
}
