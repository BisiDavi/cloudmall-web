import StoreCategoryPills from "@/components/pills/StoreCategoryPills";
import ProductCategoryPills from "@/components/pills/ProductCategoryPills";

interface Props {
  type: "restaurant" | "store";
}

export default function CategoryPills({ type }: Props) {
  console.log("type", type);
  return (
    <>{type === "store" ? <StoreCategoryPills /> : <ProductCategoryPills />}</>
  );
}
