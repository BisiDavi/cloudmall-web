import { useQuery } from "react-query";

import Product from "@/components/product";
import { productType } from "@/types/product-types";
import { getStoreProducts } from "@/utils/storeRequest";
import ProductGridViewLoader from "@/components/loaders/ProductGridViewLoader";
import EmptyCart from "@/components/cart/EmptyCart";

interface Props {
  storeId: string;
}

export default function ProductGridView({ storeId }: Props) {
  const { data, status } = useQuery(`getStoreProducts-${storeId}`, () =>
    getStoreProducts({ storeIds: [storeId] })
  );
  const productResult = data?.data.products;
  return (
    <>
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <ProductGridViewLoader />
      ) : false ? (
        <div className="gridview">
          {productResult.map((product: productType) => (
            <Product product={product} key={product.name} />
          ))}
        </div>
      ) : (
        <EmptyCart />
      )}

      <style jsx>
        {`
          .gridview {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            padding: 0px 30px;
            margin-top: 20px;
            margin-bottom: 80px;
          }
        `}
      </style>
    </>
  );
}
