import OrderlistView from "@/components/views/OrderlistView";
import StoreLayoutPage from "@/layout/store-layout";

export default function OrderPage() {
  return (
    <StoreLayoutPage title="Orders" showFooter={false}>
      <OrderlistView />
    </StoreLayoutPage>
  );
}
