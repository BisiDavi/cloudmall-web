import Modal from "@/components/modals";
import FormatPrice from "@/utils/FormatPrice";
import Button from "@/components/buttons";
import { ModalProps } from "@/types/modal-types";
import useCheckout from "@/hooks/useCheckout";
import { useEffect } from "react";
import { getFlutterwaveKeys } from "@/utils/utilsRequest";

interface WalletPaymentModalProps extends ModalProps {
  formData: any;
}

export default function WalletPaymentModal({
  closeModal,
  showModal,
  formData,
}: WalletPaymentModalProps) {
  const { useCheckoutUser } = useCheckout();
  const checkoutUser = useCheckoutUser();

  useEffect(() => {
    getFlutterwaveKeys()
      .then((response) => console.log("response", response))
      .catch((err) => console.log("error", err));
  }, []);

  function checkoutHandler(paymentMethod: "FLUTTERWAVE" | "WALLET") {
    console.log("formData", formData);
    checkoutUser.mutate({
      address: formData.address,
      instantDelivery: true,
      paymentMethod,
    });
  }

  return (
    <>
      <Modal closeModal={closeModal} showModal={showModal} persistModal>
        <div className="content">
          <div className="text-content">
            <div>
              Wallet balance:
              <span>
                <FormatPrice price={10000} />
              </span>
            </div>
            <div className="totalAmount">
              Total Amount:
              <span className="amountPrice">
                <span className="minus">-</span>
                <FormatPrice price={5000} />
              </span>
            </div>
            <div>
              Balance:
              <span>
                <FormatPrice price={5000} />
              </span>
            </div>
          </div>
          <div className="buttonGroup">
            <button
              className="itemButton withWallet"
              onClick={() => checkoutHandler("WALLET")}
            >
              Pay with Wallet
            </button>
            <Button
              text="Pay now"
              className="itemButton payNow"
              onClick={() => checkoutHandler("FLUTTERWAVE")}
            />
            <p>Pay with cards,bank transer, etc.</p>
          </div>
        </div>
      </Modal>
      <style global jsx>
        {`
          .text-content {
            background-color: var(--sky-blue2);
            padding: 5px 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
          }
          .text-content div {
            padding: 0px;
            margin: 5px 0px;
            font-size: 14px;
            font-family: "Roboto";
            line-height: 16px;
            width: 75%;
            display: flex;
            justify-content: space-between;
          }
          .totalAmount {
            color: var(--faded-text);
          }
          .minus {
            margin-right: 4px;
            font-size: 20px;
          }
          .withWallet {
            background-color: transparent;
            border: 1px solid var(--mall-blue);
            color: var(--mall-blue);
          }
          .buttonGroup .itemButton {
            height: 40px;
            margin-left: 0px;
            width: 100%;
          }
          .itemButton.payNow {
            margin-top: 40px;
          }
          .buttonGroup p {
            font-size: 12px;
            margin-top: 4px;
          }
        `}
      </style>
    </>
  );
}
