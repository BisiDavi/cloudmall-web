import { orderListType } from "@/types/order-types";
import Image from "next/image";

interface Props {
  orderList: orderListType;
}

export default function OrderListItem({ orderList }: Props) {
  const foodQuantity = orderList.quantity > 1 ? ` X ${orderList.quantity}` : "";
  return (
    <>
      <div className="orderlistitem">
        <div className="image-wrapper">
          <Image
            src={orderList.foodImage}
            height={60}
            width={60}
            alt={orderList.food}
          />
        </div>
        <div className="text-content">
          <div className="top">
            <h3>
              {orderList.food} {foodQuantity}
            </h3>
            <h6>N {orderList.price}</h6>
          </div>
          <ul className="others">
            {orderList.others.map((item, index) => {
              const orderQuantity =
                item.quantity > 1 ? `(${item.quantity})` : "";
              return <li key={index}>{`${item.food} ${orderQuantity} ,`}</li>;
            })}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .orderlistitem {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(62, 64, 68, 0.25);
          padding: 10px 0px;
          width: 100%;
        }
        .image-wrapper {
          width: 20%;
        }
        .text-content {
          display: flex;
          flex-direction: column;
          width: 80%;
          font-family: "Roboto";
          font-style: normal;
        }
        .top {
          display: flex;
          justify-content: space-between;
        }
        .top h3 {
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: 0.0025em;
          color: var(--text-color);
        }
        .top h6 {
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0.0025em;
          color: #3e4044;
        }
        .others {
          display: flex;
          list-style: none;
          padding: 0px;
        }
        .others li {
          font-weight: 300;
          font-size: 12px;
          line-height: 16px;
          list-decoration: none;
          color: rgba(62, 64, 68, 0.7);
          margin-right: 5px;
        }
      `}</style>
    </>
  );
}
