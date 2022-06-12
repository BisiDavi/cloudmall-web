import { useQuery } from "react-query";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import StoreviewList from "@/components/store-view/StoreviewList";
import { listStore } from "@/utils/storeRequest";
import { storeType } from "@/types/store-types";
import { useAppSelector } from "@/hooks/useRedux";

export default function Storeview() {
  const { category } = useAppSelector((state) => state.category);
  const { search } = useAppSelector((state) => state.search);

  console.log("search", search);

  const storeviewFunc = search
    ? () => listStore({ text: search })
    : search || category.length > 0
    ? () => listStore({ categoryIds: category, text: search })
    : listStore;
  const categoryKey = search ? search : category.length > 0 ? category : "";
  const { data, status } = useQuery(`listStores-${categoryKey}`, storeviewFunc);

  return (
    <>
      <div className="store-view">
        <RestaurantPillsGroup storeType="restaurant" />
        <div className="list">
          {status === "error"
            ? "error occured"
            : status === "loading"
            ? "loading"
            : data?.data.stores.map((store: storeType) => (
                <StoreviewList store={store} key={store._id} />
              ))}
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
