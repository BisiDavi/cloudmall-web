import { useQuery } from "react-query";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import ProductGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";
import { storeProfile } from "@/utils/storeRequest";
import useClearExpiredCart from "@/hooks/useClearExpiredCart";
import useBaseUrl from "@/hooks/useBaseUrl";

interface Props {
  storeId: string;
}

export default function Storepageview({ storeId }: Props) {
  const { baseURL } = useBaseUrl();

  const { data, status } = useQuery(`store-profile-${storeId}`, () =>
    storeProfile(baseURL, storeId)
  );
  useClearExpiredCart();

  const storeName = status === "success" ? data?.data?.store?.name : "";

  return (
    <StoreLayoutPage title={storeName} padding="0px 0px 0px 0px">
      {storeId !== undefined && (
        <RestaurantPillsGroup
          storeType="store"
          category={data?.data?.store?.category?.name}
        />
      )}
      {storeId !== undefined && <ProductGridView storeId={storeId} />}
    </StoreLayoutPage>
  );
}
