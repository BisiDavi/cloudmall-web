import { useRouter } from "next/router";
import { useQuery } from "react-query";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import ProductGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";
import { storeProfile } from "@/utils/storeRequest";

export default function StorePage() {
  const router: any = useRouter();
  const storeId = router?.query?.store_id;
  const { data, status } = useQuery(`store-profile-${storeId}`, () =>
    storeProfile(storeId)
  );

  const storeName = status === "success" ? data?.data?.store?.name : "";

  return (
    <StoreLayoutPage title={storeName} padding="0px 0px 0px 0px">
      <RestaurantPillsGroup
        storeType="store"
        category={data?.data?.store?.category?.name}
      />
      {storeId && <ProductGridView storeId={storeId} />}
    </StoreLayoutPage>
  );
}
