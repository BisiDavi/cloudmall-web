import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import stores from "@/json/stores.json";
import StoreviewList from "@/components/store-view/StoreviewList";

export default function Storeview() {
  return (
    <>
      <div className="store-view">
        <RestaurantPillsGroup storeType="restaurant" />
        <div className="list">
          {stores.map((store) => (
            <StoreviewList store={store} key={store.name} />
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
