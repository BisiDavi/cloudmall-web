import CartItem from "@/components/cart/CartItem";
import useCart from "@/hooks/useCart";
import CartFooter from "@/components/cart/CartFooter";
import Image from "next/image";

export default function CartGroup() {
  const { useGetCart } = useCart();
  const [cart, status] = useGetCart();

  return (
    <>
      {status === "error" ? (
        "error occured"
      ) : status === "loading" ? (
        <Image
          src="/shopping-cart.gif"
          alt="cart loading"
          height={300}
          width={300}
        />
      ) : (
        cart?.items.map((cartItem: any) => (
          <CartItem item={cartItem} key={cartItem._id} />
        ))
      )}
      <CartFooter total={cart?.fees?.total} />
      <div className="bottom" />
      <style jsx>
        {`
          .bottom {
            margin-bottom: 40px;
          }
        `}
      </style>
    </>
  );
}
