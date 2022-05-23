import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import ProcuctGridView from "@/components/product/ProductGridView";
import StoreLayoutPage from "@/layout/store-layout";
import toSentenceCase from "@/utils/toSentenceCase";
import { useRouter } from "next/router";

export default function StorePage() {
  const router: any = useRouter();
  const storeName = router.asPath.split("/")[2];

  const sentenceCase = toSentenceCase(storeName);
  return (
    <StoreLayoutPage title={sentenceCase}>
      <RestaurantPillsGroup storeType="store" />
      <ProcuctGridView />
    </StoreLayoutPage>
  );
}
