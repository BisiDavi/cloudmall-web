import formContent from "@/json/delivery-details.json";
import Input from "@/components/forms/FormElements/Input";
import NoteIcon from "@/components/icons/NoteIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import Button from "@/components/buttons";
import { useRouter } from "next/router";

const totalItems = [
  { text: "Items", price: "N3100" },
  { text: "Delivery Fee", price: "N400" },
  { text: "Service Fee", price: "N61" },
  { text: "Total Amount", price: "N3561" },
];

export default function DeliverydetailsForm() {
  const router = useRouter();

  function buttonHandler() {
    return router.push("/payment-confirmation");
  }

  return (
    <>
      <form className="delivery-details">
        <div className="form-input">
          {formContent.map((inputContent) => (
            <Input input={inputContent} key={inputContent.id} />
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
          {totalItems.map((item) => (
            <li key={item.text}>
              <p>{item.text}</p>
              <p>{item.price}</p>
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
    </>
  );
}
