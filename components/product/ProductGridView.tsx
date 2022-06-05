import products from "@/json/products.json";
import Product from "@/components/product";

export default function ProcuctGridView() {
  return (
    <div className="gridview">
      {products.map((product) => (
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
          }
        `}
      </style>
    </div>
  );
}
