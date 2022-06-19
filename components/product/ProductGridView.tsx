import { useQuery } from "react-query";

import Product from "@/components/product";
import { productType } from "@/types/product-types";
import { getStoreProducts } from "@/utils/storeRequest";
import ProductGridViewLoader from "@/components/loaders/ProductGridViewLoader";

interface Props {
  storeId: string;
}

export default function ProductGridView({ storeId }: Props) {
  const { data, status } = useQuery(`getStoreProducts-${storeId}`, () =>
    getStoreProducts({ storeIds: [storeId] })
  );

  return (
    <>
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <ProductGridViewLoader />
      ) : (
        <div className="gridview">
          {data?.data.products.map((product: productType) => (
            <Product product={product} key={product.name} />
          ))}
        </div>
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
