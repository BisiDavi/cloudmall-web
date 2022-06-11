import Product from "@/components/product";
import { productType } from "@/types/product-types";
import { getStoreProducts } from "@/utils/storeRequest";
import { useQuery } from "react-query";

interface Props {
  storeId: string;
}

export default function ProcuctGridView({ storeId }: Props) {
  const { data, status } = useQuery(`getStoreProducts-${storeId}`, () =>
    getStoreProducts({ storeIds: [storeId] })
  );
  console.log("data", data);

  return (
    <div className="gridview">
      {status === "error"
        ? "error"
        : status === "loading"
        ? "loading"
        : data?.data.products.map((product: productType) => (
            <Product product={product} key={product.name} />
          ))}
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
    </div>
  );
}
