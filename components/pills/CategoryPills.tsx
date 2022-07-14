import StoreCategoryPills from "@/components/pills/StoreCategoryPills";
import ProductCategoryPills from "@/components/pills/ProductCategoryPills";

interface Props {
  type: "product" | "store";
}

export default function CategoryPills({ type }: Props) {
  return (
    <>{type === "store" ? <StoreCategoryPills /> : <ProductCategoryPills />}</>
  );
}
