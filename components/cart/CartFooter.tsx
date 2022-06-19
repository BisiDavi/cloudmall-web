import { useAppDispatch } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";

export default function CartFooter({ total }: any) {
  const dispatch = useAppDispatch();

  function onCheckoutHandler() {
    dispatch(updateModal("loginQuestionModal"));
  }

  return (
    <>
      <div className="footer">
        <div className="cost">
          <h4>Total Cost</h4>
          <h4>N {total}</h4>
        </div>
        <a className="itemButton cart" onClick={onCheckoutHandler}>
          Checkout
        </a>
      </div>
      <style jsx>
        {`
          .footer {
            position: fixed;
            display: flex;
            flex-direction: column;
            margin: auto;
            bottom: 0px;
            width: 100%;
            background-color: white;
            left: 0px;
            padding-bottom: 10px;
          }
          .cost {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: var(--light-gray);
            padding: 20px;
            margin-bottom: 20px;
          }
        `}
      </style>
    </>
  );
}
