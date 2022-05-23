import CartItem from "@/components/cart/CartItem";
import useCart from "@/hooks/useCart";
import StoreLayoutPage from "@/layout/store-layout";

export default function CartPage() {
  const { cart } = useCart();
  return (
    <StoreLayoutPage title="Cart">
      <div className="cart-group">
        {cart.map((cartItem) => (
          <CartItem cart={cartItem} key={cartItem.name} />
        ))}
        <style jsx>
          {`
            .cart-group {
              padding: 0px 20px;
            }
          `}
        </style>
      </div>
    </StoreLayoutPage>
  );
}
