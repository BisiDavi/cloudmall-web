import { orderListType } from "@/types/order-types";
import OrderListItem from "../orders/OrderListItem";

interface Props {
  orderList: orderListType[];
  storeName: string;
}

export default function OrderlistitemView({ orderList, storeName }: Props) {
  return (
    <>
      <div className="order-list-item-view">
        <h3>{storeName}</h3>
        <div className="list">
          {orderList.map((order) => (
            <OrderListItem orderList={order} key={order.orderId} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .order-list-item-view {
          padding: 0px 20px;
        }
        .order-list-item-view h3 {
          font-family: "Roboto", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.0025em;
          color: black;
        }
        .list {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}
