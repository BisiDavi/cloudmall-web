import stores from "@/json//stores.json";
import StoreviewList from "@/components/store-view/StoreviewList";

export default function Storeview() {
  
  return (
    <>
      <div className="store-view">
        {stores.map((store) => (
          <StoreviewList store={store} key={store.name} />
        ))}
      </div>
      <style jsx>
        {`
          .store-view {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
}
