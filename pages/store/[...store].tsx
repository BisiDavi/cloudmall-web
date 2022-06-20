import { useRouter } from "next/router";

import Storepageview from "@/components/store-view/Storeview";

export default function StorePage() {
  const router: any = useRouter();
  const storeId = router?.query?.store_id;

  return <>{storeId !== undefined && <Storepageview storeId={storeId} />}</>;
}
