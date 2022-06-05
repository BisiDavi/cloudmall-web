import Orderlist from "@/components/orders/Orderlist";
import storesOrder from "@/json/store-orders.json";

export default function OrderlistView() {
  return (
    <>
      <div className="order-list-view">
        {storesOrder.map((storeItem) => (
          <Orderlist key={storeItem.orderNumber} store={storeItem} />
        ))}
      </div>
      <style jsx>
        {`
          .order-list-view {
            padding: 10px 20px;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
}
