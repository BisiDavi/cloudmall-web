import { useQuery } from "react-query";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import StoreviewList from "@/components/store-view/StoreviewList";
import { listStore } from "@/utils/storeRequest";
import { storeType } from "@/types/store-types";

export default function Storeview() {
  const { data, status } = useQuery("listStores", listStore);

  
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
