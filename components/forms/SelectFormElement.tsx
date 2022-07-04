import dynamic from "next/dynamic";

const DeliveryCategory = dynamic(
  () => import("@/components/forms/DeliveryCategory"),
  {
    ssr: false,
  }
);

const DeliveryTime = dynamic(
  () => import("@/components/forms/FormElements/DeliveryTime"),
  {
    ssr: false,
  }
);

const PasswordInput = dynamic(
  () => import("@/components/forms/FormElements/PasswordInput"),
  {
    ssr: false,
  }
);

const Input = dynamic(() => import("@/components/forms/FormElements/Input"), {
  ssr: false,
});

const Select = dynamic(() => import("@/components/forms/FormElements/Select"), {
  ssr: false,
});

export default function SelectFormElement({ input }: any) {
  switch (input.elementType) {
    case "input":
      return <Input input={input} />;
    case "password":
      return <PasswordInput input={input} />;
    case "select":
      return <Select input={input} />;
    case "deliveryTime":
      return <DeliveryTime />;
    case "deliveryCategory":
      return <DeliveryCategory input={input} />;
    default:
      return null;
  }
}
