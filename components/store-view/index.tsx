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
            margin-top: 20px;
            border-top: 1px solid rgba(62, 64, 68, 0.25);
            display: flex;
            flex-direction: column;
            margin-bottom: 100px;
          }
        `}
      </style>
    </>
  );
}
