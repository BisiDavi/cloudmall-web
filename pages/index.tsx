import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import Storeview from "@/components/store-view";
import StoreLayoutPage from "@/layout/store-layout";

export default function Home() {
  return (
    <StoreLayoutPage title="Cloudmall Africa">
      <RestaurantPillsGroup storeType="restaurant" />
      <Storeview />
    </StoreLayoutPage>
  );
}