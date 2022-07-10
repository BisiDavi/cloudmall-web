import { useQuery } from "react-query";

import Product from "@/components/product";
import { productType } from "@/types/product-types";
import useStoreRequest from "@/hooks/useStoreRequest";
import ProductGridViewLoader from "@/components/loaders/ProductGridViewLoader";
import EmptyCart from "@/components/cart/EmptyCart";
import useBaseUrl from "@/hooks/useBaseUrl";

interface Props {
  storeId: string;
}

export default function ProductGridView({ storeId }: Props) {
  const [baseURL] = useBaseUrl();
  const { getStoreProducts } = useStoreRequest();

  const { data, status } = useQuery(
    `getStoreProducts-${storeId}`,
    () => getStoreProducts(baseURL, { storeIds: [storeId] }),
    {
      enabled: !!baseURL,
    }
  );
  const productResult = data?.data?.products;

  return (
    <>
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <ProductGridViewLoader />
      ) : productResult.length > 0 ? (
        <div className="gridview">
          {productResult.map((product: productType) => (
            <Product product={product} key={product.name} storeId={storeId} />
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
