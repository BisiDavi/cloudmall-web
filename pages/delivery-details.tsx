import DeliverydetailsForm from "@/components/forms/DeliverydetailsForm";
import useLoginRedirect from "@/hooks/useLoginRedirect";
import DefaultLayout from "@/layout/default-layout";

export default function Deliverydetails() {
  useLoginRedirect();
  return (
    <DefaultLayout title="Delivery Details" padding="0px">
      <DeliverydetailsForm />
    </DefaultLayout>
  );
}
