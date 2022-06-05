import { useRouter } from "next/router";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import ProcuctGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";
import toSentenceCase from "@/utils/toSentenceCase";

export default function StorePage() {
  const router: any = useRouter();
  const storeName = router.asPath.split("/")[2];

  const sentenceCase = toSentenceCase(storeName);
  return (
    <StoreLayoutPage title={sentenceCase} padding="0px 0px 0px 0px">
      <RestaurantPillsGroup storeType="store" />
      <ProcuctGridView />
    </StoreLayoutPage>
  );
}
