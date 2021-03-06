import Image from "next/image";

import { productType } from "@/types/product-types";
import ProductQtyDropdown from "@/components/product/ProductQtyDropdown";
import { useState } from "react";
import useBaseUrl from "@/hooks/useBaseUrl";

interface Props {
  product: productType;
  storeId: string;
}

export default function Product({ product, storeId }: Props) {
  const [dropdown, setDropdown] = useState(false);
  const [, formattedImage] = useBaseUrl();

  function dropdownHandler() {
    if (dropdown) {
      setDropdown(false);
    }
  }

  const productClass = dropdown ? "overlay" : "";

  return (
    <div className="product-view">
      <div className={`${productClass}`} onClick={dropdownHandler} />
      <div className="product">
        <Image
          src={`${formattedImage}${product.image}`}
          alt={product.name}
          height={150}
          width={200}
          blurDataURL={`${formattedImage}${product.image}`}
          placeholder="blur"
        />
        <div className="content">
          <h3>{product.name}</h3>
          <div className="layer">
            <h4>{product.unitPrice}</h4>
            <ProductQtyDropdown
              product={product}
              storeId={storeId}
              dropdown={dropdown}
              setDropdown={setDropdown}
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .product-view {
            position: relative;
          }
          .overlay {
            background-color: #00000080;
            top: 0px;
            height: 100%;
            width: 100%;
            z-index: 100;
            position: absolute;
            border-radius: 5px;
          }
          .product {
            display: flex;
            flex-direction: column;
            position: relative;
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
            position: relative;
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
    </div>
  );
}
