/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { FormProvider } from "react-hook-form";

import formContent from "@/json/delivery-details.json";
import NoteIcon from "@/components/icons/NoteIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import Button from "@/components/buttons";
import SelectFormElement from "@/components/forms/SelectFormElement";
import useCart from "@/hooks/useCart";
import useDeliverydetails from "@/hooks/useDeliverydetails";
import FormatPrice from "@/utils/FormatPrice";
import WalletPaymentModal from "@/components/modals/WalletPaymentModal";
import useModal from "@/hooks/useModal";

export default function DeliverydetailsForm() {
  const router = useRouter();
  const { useGetCart } = useCart();
  const [cart] = useGetCart();
  const { methods } = useDeliverydetails();
  const { modal, updateModalHandler } = useModal();

  function buttonHandler() {
    updateModalHandler("paymentModal");
    // return router.push("/payment-confirmation");
  }

  const orderPrices = [
    { text: "Items", price: cart?.fees?.items },
    { text: "Delivery Fee", price: cart?.fees?.delivery },
    { text: "Service Fee", price: cart?.fees?.service },
    { text: "Total Amount", price: cart?.fees?.total },
  ];

  return (
    <>
      {modal === "paymentModal" && (
        <WalletPaymentModal
          showModal={modal}
          closeModal={() => updateModalHandler(null)}
        />
      )}
      <FormProvider {...methods}>
        <form className="delivery-details">
          <div className="form-input">
            {formContent.map((inputContent) => (
              <SelectFormElement input={inputContent} key={inputContent.id} />
            ))}
          </div>
          <div className="order-note">
            <span>
              <p>Order Note</p>
              <InfoIcon />
            </span>
            <NoteIcon />
          </div>
          <ul className="delivery-items">
            {orderPrices.map((item) => (
              <li key={item.text}>
                <p>{item.text}</p>
                <span>
                  <FormatPrice price={item.price} />
                </span>
              </li>
            ))}
          </ul>
          <Button
            className="itemButton"
            text="Complete Payment"
            onClick={buttonHandler}
          />
        </form>
        <style jsx>
          {`
            .delivery-details {
              font-family: "Roboto", sans-serif;
              font-style: normal;
            }
            .order-note {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 0px 20px;
            }
            .order-note span {
              display: flex;
              align-items: center;
            }
            .order-note span p {
              margin-right: 10px;
            }
            .form-input {
              padding: 0px 20px;
            }
            .delivery-items {
              padding: 0px;
              margin: 0px;
              background-color: var(--cream);
              padding: 10px 20px;
              border-top: 1px solid rgba(0, 0, 0, 0.25);
              border-bottom: 1px solid rgba(0, 0, 0, 0.25);
            }
            .delivery-items li {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin: 5px 0px;
              font-size: 14px;
            }
            .delivery-items li p {
              margin: 2px 0px;
            }
            .delivery-items li:first-child p {
              font-weight: 500;
            }
            .delivery-items li p {
              font-weight: 400;
            }
            .delivery-items li:last-child p {
              font-weight: 700;
            }
          `}
        </style>
      </FormProvider>
    </>
  );
}
