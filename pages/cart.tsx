import Button from "@/components/buttons";
import CartFooter from "@/components/cart/CartFooter";
import CartGroup from "@/components/cart/CartGroup";
import useCart from "@/hooks/useCart";
import DefaultLayout from "@/layout/default-layout";

export default function CartPage() {
  const { cart } = useCart();

  console.log("cart", cart);

  return (
    <DefaultLayout title="Cart">
      <div className="cart-group">
        <CartGroup cart={cart} />
        <CartFooter total={300} />
        <style jsx>
          {`
            .cart-group {
              padding: 0px 20px;
            }
          `}
        </style>
      </div>
    </DefaultLayout>
  );
}
