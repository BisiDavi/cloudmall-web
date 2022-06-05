import PaymentView from "@/components/views/PaymentView";
import DefaultLayout from "@/layout/default-layout";

export default function PaymentConfirmation() {
  return (
    <DefaultLayout title="Payment Complete" showArrow={false}>
      <>
        <div className="payment-confirmation">
          <PaymentView />
        </div>
        <style jsx>
          {`
            .payment-confirmation {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin: auto 15px;
              height: 75vh;
            }
          `}
        </style>
      </>
    </DefaultLayout>
  );
}
