import CartFooter from "@/components/cart/CartFooter";
import CartGroup from "@/components/cart/CartGroup";
import DefaultLayout from "@/layout/default-layout";

export default function CartPage() {

  return (
    <DefaultLayout title="Cart">
      <CartGroup />
      <CartFooter total={300} />
    </DefaultLayout>
  );
}
