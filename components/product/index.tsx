import Image from "next/image";

import AddIcon from "@/components/icons/AddIcon";
import useCart from "@/hooks/useCart";
import useCartMutationAction from "@/hooks/useCartMutationAction";

type productType = {
  name: string;
  price: number;
  image: string;
};

interface Props {
  product: productType;
}

export default function Product({ product }: Props) {
  const { useAddToCart, cart } = useCartMutationAction();
  const cartActions = useAddToCart();

  const productCount = cart?.filter(
    (cartItem) => cartItem?.name === product?.name
  ).length;
  const quantiy = productCount > 0 ? productCount : "";
  const buttonClassName = productCount > 0 ? "added" : "product-button";

  return (
    <>
      <div className="product">
        <Image
          src={product.image}
          alt={product.name}
          height={100}
          width={200}
        />
        <div className="content">
          <h3>{product.name}</h3>
          <div className="layer">
            <h4>{product.price}</h4>
            <button
              type="button"
              onClick={() => cartActions.mutate(product)}
              className={`button ${buttonClassName}`}
            >
              {quantiy > 0 ? quantiy : <AddIcon />}
            </button>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .product {
            display: flex;
            flex-direction: column;
          }
          .content {
            display: flex;
            flex-direction: column;
            border: 1px solid #80808021;
            padding: 5px 10px;
            box-shadow: 0px 2px #f29b0a7a;
            font-size: 12px;
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
            line-height: 14px;
            height: 70px;
            justify-content: space-between;
          }
          .layer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .content h3 {
            font-size: 12px;
          }

          .content h4 {
            color: var(--mall-blue);
            font-size: 12px;
          }
          .button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            color: white;
          }
          .added {
            background-color: var(--deep-green);
          }
          .product-button {
            background-color: var(--mall-blue);
          }
        `}
      </style>
    </>
  );
}
