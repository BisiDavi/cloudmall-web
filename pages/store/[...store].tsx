import { useRouter } from "next/router";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import ProcuctGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";

export default function StorePage() {
  const router: any = useRouter();
  const storeName = router?.query.store_name;
  const storeId = router?.query.store_id;

  return (
    <StoreLayoutPage title={storeName} padding="0px 0px 0px 0px">
      <RestaurantPillsGroup storeType="store" />
      <ProcuctGridView storeId={storeId} />
    </StoreLayoutPage>
  );
}
