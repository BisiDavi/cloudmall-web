import Image from "next/image";

import Button from "@/components/buttons";

export default function PaymentView() {
  return (
    <>
      <div className="payment-complete">
        <div className="image-wrapper">
          <Image
            className="approved"
            src="/approved.png"
            height={33}
            width={33}
            alt="approved"
          />
        </div>
        <div className="text-content payment">
          <h3>Payment Complete</h3>
          <p>
            You have successfully ordered.Go to WhatsApp to get update on your
            order
          </p>
        </div>
      </div>
        <Button className="itemButton" text="Go to WhatsApp" />
      <style jsx>{`
        .image-wrapper {
          display: flex;
          justify-content: center;
          margin: 20px auto;
        }
        .payment-complete {
          font-family: "Montserrat", sans-serif;
          font-style: normal;
          display: flex;
          flex-direction: column;
          background-color: var(--light-blue);
          padding: 15px 20px;
          border-radius: 5px;
          box-shadow: 0px 4px 4px rgba(0, 47, 120, 0.25);
        }

        .text-content.payment h3 {
          text-align: center;
          font-weight: 700;
          font-size: 18px;
          line-height: 24px;
        }

        .text-content.payment p {
          font-family: "Roboto";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
        }
      `}</style>
    </>
  );
}
