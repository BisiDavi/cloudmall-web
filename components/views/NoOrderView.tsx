import DefaultLayout from "@/layout/default-layout";
import Image from "next/image";
import Link from "next/link";

const buttonArray = [
  { link: "/", text: "Back to Home" },
  { link: "/auth/login", text: "Link Account" },
];

export default function NoOrderView() {
  return (
    <DefaultLayout title="Orders">
      <div className="no-order">
        <div className="no-order-image">
          <Image src="/no-order.webp" alt="no order" height={250} width={260} />
        </div>
        <div className="text-group">
          <p>You have no orders for the selected location</p>
          <p>
            Go to home to make new order or link your cloudmall account below,
            and view your past orders
          </p>
        </div>
        <div className="footer">
          {buttonArray.map((buttonItem, index) => (
            <Link href={buttonItem.link} key={index} passHref>
              <a className="itemButton no-order">{buttonItem.text} </a>
            </Link>
          ))}
        </div>
        <style jsx>
          {`
            .no-order {
              padding: 0px 20px;
            }

            .no-order-image {
              display: flex;
              margin: auto;
              justify-content: center;
              margin-top: 15%;
            }

            .text-group {
              font-family: "Roboto", sans-serif;
              font-style: normal;
              font-weight: 600;
              font-size: 18px;
              line-height: 24px;
              text-align: justify;
              letter-spacing: 0.0015em;
              color: #000000;
            }

            .footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          `}
        </style>
      </div>
    </DefaultLayout>
  );
}
