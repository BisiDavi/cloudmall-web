import Image from "next/image";

import Button from "@/components/buttons";

export default function PaymentView() {
  return (
    <>
      <div className="payment-complete">
        <Image
          className="approved"
          src="/approved.png"
          height={33}
          width={33}
          alt="approved"
        />
        <div className="context">
          <h3>Payment Complete</h3>
          <p>
            You have successfully ordered #1234.Go to WhatsApp to get update on
            your order
          </p>
        </div>
        <Button text="Go to WhatsApp" />
      </div>
      <style jsx>{``}</style>
    </>
  );
}
