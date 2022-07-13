import Link from "next/link";

import { storeType } from "@/types/store-types";
import StoreListView from "./StoreListView";

interface Props {
  store: storeType;
}

export default function StoreList({ store }: Props) {
  return (
    <>
      {store.isCurrentlyOpen ? (
        <Link
          passHref
          href={{
            pathname: `/store/${store.name}`,
            query: { store_id: store._id },
          }}
        >
          <StoreListView store={store} />
        </Link>
      ) : (
        <StoreListView store={store} />
      )}
    </>
  );
}
