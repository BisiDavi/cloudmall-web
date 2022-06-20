// import CartItem from "@/components/cart/CartItem";
import useCart from "@/hooks/useCart";

export default function CartGroup() {
  const { useGetCart } = useCart();
  const [data, status] = useGetCart();

  console.log("data", data);
  console.log("status", status);

  return (
    <>
      {/* {cart.map((cartItem: any) => (
        <CartItem cart={cartItem} key={cartItem.name} />
      ))} */}
    </>
  );
}
