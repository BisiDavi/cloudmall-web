import Button from "@/components/buttons";
import CartItem from "@/components/cart/CartItem";
import useCart from "@/hooks/useCart";
import DefaultLayout from "@/layout/default-layout";

export default function CartPage() {
  const { cart } = useCart();
  return (
    <DefaultLayout title="Cart">
      <div className="cart-group">
        {cart.map((cartItem) => (
          <CartItem cart={cartItem} key={cartItem.name} />
        ))}
        <div className="footer">
          <div className="cost">
            <h4>Total Cost</h4>
            <h4>N 300</h4>
          </div>
          <Button className="itemButton cart" text="Checkout" />
        </div>
        <style jsx>
          {`
            .cart-group {
              padding: 0px 20px;
            }
            .footer {
              position: fixed;
              display: flex;
              flex-direction: column;
              margin: auto;
              bottom: 0px;
              width: 100%;
              left: 0px;
              padding-bottom: 10px;
            }
            .cost {
              display: flex;
              align-items: center;
              justify-content: space-between;
              background-color: var(--light-gray);
              padding: 20px;
              margin-bottom: 10px;
            }
          `}
        </style>
      </div>
    </DefaultLayout>
  );
}
