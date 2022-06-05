import { orderListType } from "@/types/order-types";
import Link from "next/link";
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
            <OrderListItem orderList={order} key={order?.orderId} />
          ))}
        </div>
        <div className="total">
          <div className="total-view">
            <p>Total</p>
            <p>4,500.00</p>
          </div>
          <Link href="/cart" passHref>
            <a className="proceed">Proceed</a>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .list {
          border-top: 1px solid rgba(62, 64, 68, 0.25);
        }
        .order-list-item-view h3 {
          font-family: "Roboto", sans-serif;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.0025em;
          color: black;
          padding: 0px 20px;
        }
        .list {
          margin-top: 20px;
        }
        .total-view {
          display: flex;
          width: 50%;
          justify-content: space-between;
          justify-items: end;
          align-items: flex-end;
        }
        .total {
          position: fixed;
          bottom: 0px;
          border-top: 1px solid rgba(62, 64, 68, 0.25);
          height: 100px;
          display: flex;
          flex-direction: column;
          padding: 0px 20px;
          margin-bottom: 15px;
          width: 100%;
          align-items: flex-end;
        }
        .proceed {
          background-color: var(--mall-blue);
          color: white;
          width: 100%;
          display: flex;
          justify-content: center;
          border: none;
          margin: auto;
          padding: 10px;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}
