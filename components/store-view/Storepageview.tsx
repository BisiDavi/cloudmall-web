import { useQuery } from "react-query";

import ProductGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";
import useStoreRequest from "@/hooks/useStoreRequest";
import useClearExpiredCart from "@/hooks/useClearExpiredCart";
import useBaseUrl from "@/hooks/useBaseUrl";
import CategoryPills from "@/components/pills/CategoryPills";

interface Props {
  storeId: string;
}

export default function Storepageview({ storeId }: Props) {
  const [baseURL] = useBaseUrl();
  const { storeProfile } = useStoreRequest();

  const { data, status } = useQuery(
    `store-profile-${storeId}`,
    () => storeProfile(baseURL, storeId),
    {
      enabled: !!baseURL,
    }
  );
  console.log("data-store", data);
  useClearExpiredCart();

  const storeName = status === "success" ? data?.data?.store?.name : "";

  console.log("storeId", storeId);

  return (
    <StoreLayoutPage title={storeName} padding="0px 0px 0px 0px">
      {storeId !== undefined && <CategoryPills type="store" />}
      {storeId !== undefined && <ProductGridView storeId={storeId} />}
    </StoreLayoutPage>
  );
}
