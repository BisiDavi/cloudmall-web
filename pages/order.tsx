import OrderlistView from "@/components/views/OrderlistView";
import StoreLayoutPage from "@/layout/store-layout";

export default function OrderPage() {
  return (
    <StoreLayoutPage title="Orders" showFooter={false} padding="0px">
      <OrderlistView />
    </StoreLayoutPage>
  );
}
