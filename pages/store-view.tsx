import Storeview from "@/components/store-view";
import StoreLayoutPage from "@/layout/store-layout";

export default function Home() {
  return (
    <StoreLayoutPage title="Cloudmall Africa" padding="0px" showArrow={false}>
      <Storeview />
    </StoreLayoutPage>
  );
}
