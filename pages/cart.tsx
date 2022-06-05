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
      <CartGroup cart={cart} />
      <CartFooter total={300} />
    </DefaultLayout>
  );
}
