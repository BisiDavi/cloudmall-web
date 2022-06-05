import formContent from "@/json/delivery-details.json";
import Input from "@/components/forms/FormElements/Input";

export default function DeliverydetailsForm() {
  return (
    <form>
      {formContent.map((inputContent) => (
        <Input input={inputContent} key={inputContent.id} />
      ))}
    </form>
  );
}
 