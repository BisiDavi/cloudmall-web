import CartView from "@/components/cart/CartView";
import DefaultLayout from "@/layout/default-layout";

export default function CartPage() {
  return (
    <DefaultLayout title="Cart">
      <CartView />
    </DefaultLayout>
  );
}
