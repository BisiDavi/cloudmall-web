import { useQuery } from "react-query";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import StoreviewList from "@/components/store-view/StoreviewList";
import useStoreRequest from "@/hooks/useStoreRequest";
import { storeType } from "@/types/store-types";
import { useAppSelector } from "@/hooks/useRedux";
import StoreListLoader from "@/components/loaders/StoreListLoader";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function Storeview() {
  const { category } = useAppSelector((state) => state.category);
  const { search } = useAppSelector((state) => state.search);
  const baseURL = useBaseUrl();
  const { listStore } = useStoreRequest();
  const { user } = useAppSelector((state) => state.user);

  const coordinates  = user?.addresses[0]?.location?.coordinates;

  const storeviewFunc: any = () => {
    return search.length > 3
      ? () => listStore(baseURL, { text: search, coordinates})
      : search || category.length > 0
      ? () =>
          listStore(baseURL, {
            categoryIds: category,
            text: search,
            coordinates,
          })
      : listStore(baseURL, { coordinates});
  };

  const categoryKey = search ? search : category.length > 0 ? category : "";

  const { data, status }: any = useQuery(
    `listStores-${categoryKey}`,
    storeviewFunc,
    {
      enabled: !!baseURL,
    }
  );

  return (
    <>
      <div className="store-view">
        <RestaurantPillsGroup storeType="restaurant" />
        <div className="list">
          {status === "error" ? (
            "error occured"
          ) : status === "loading" ? (
            <StoreListLoader />
          ) : (
            data?.data?.stores.map((store: storeType) => (
              <StoreviewList store={store} key={store._id} />
            ))
          )}
        </div>
      </div>
      <style jsx>
        {`
          .store-view {
            display: flex;
            flex-direction: column;
            margin-bottom: 100px;
          }
          .list {
            border-top: 1px solid rgba(62, 64, 68, 0.25);
            margin-top: 20px;
          }
        `}
      </style>
    </>
  );
}
