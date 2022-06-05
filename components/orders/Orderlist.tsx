import { orderListType } from "@/types/order-types";
import toSlug from "@/utils/toSlug";
import Link from "next/link";

interface OrderlistProps {
  store: {
    name: string;
    orderNumber: number;
    date: string;
    orderStatus: "Cancelled" | "Delivered" | string;
    orders: orderListType[] | [];
  };
}
export default function Orderlist({ store }: OrderlistProps) {
  return (
    <>
      <Link
        href={`/orders/${toSlug(store.name)}/${store.orderNumber}`}
        passHref
      >
        <div className="order-list">
          <div className="top view">
            <h4>{store.name}</h4>
            <p>{store.date}</p>
          </div>
          <div className="bottom view">
            <h6>#{store.orderNumber}</h6>
            <button className={store.orderStatus}>{store.orderStatus}</button>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .order-list {
          border-bottom: 1px solid rgba(62, 64, 68, 0.25);
          padding: 10px 0px;
          color: var(--text-color);
          font-family: "Roboto", sans-serif;
          font-style: normal;
        }
        .order-list .view {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .top h4 {
          font-weight: 500;
          line-height: 16px;
          letter-spacing: 0.0025em;
        }

        .bottom h6 {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.0025em;
        }

        .bottom button {
          border-radius: 5px;
          width: 100px;
          height: 15px;
          display: flex;
          align-items: center;
          padding: 10px 0px;
          justify-content: center;
          border: none;
          font-weight: 400;
          font-size: 10px;
          line-height: 12px;
          color: white;
        }

        button.Delivered {
          background-color: var(--leaf-green);
        }
        button.Cancelled {
          background-color: var(--text-red);
        }
      `}</style>
    </>
  );
}
