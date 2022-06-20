import CartGroup from "@/components/cart/CartGroup";
import DefaultLayout from "@/layout/default-layout";

export default function CartPage() {

  return (
    <DefaultLayout title="Cart">
      <CartGroup />
    </DefaultLayout>
  );
}
