import DefaultLayout from "@/layout/default-layout";
import { useRouter } from "next/router";

import storesOrder from "@/json/store-orders.json";
import OrderlistitemView from "@/components/views/OrderlistitemView";
import NoOrderView from "@/components/views/NoOrderView";

export default function Index() {
  const router: any = useRouter();
  // const orderId = router?.query?.store[1];
  // const orderData = storesOrder.filter(
  //   (storeOrder) => Number(storeOrder.orderNumber) === Number(orderId)
  // );

  // const orderList = orderData[0]?.orders;

  return (
    <>
      {false ? (
        <DefaultLayout title="List of Items" padding="0px">
          <OrderlistitemView orderList={[]} storeName={""} />
        </DefaultLayout>
      ) : (
        <NoOrderView />
      )}
    </>
  );
}
