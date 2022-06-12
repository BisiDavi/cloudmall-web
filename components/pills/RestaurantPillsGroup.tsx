import { useQuery } from "react-query";

import Pill from "@/components/pills";
import { listStoreCategories } from "@/utils/storeRequest";
import { storeCategoryType } from "@/types/store-types";
import { useState } from "react";

interface Props {
  storeType: "restaurant" | "store";
  category?: string;
}

export default function RestaurantPillsGroup({ storeType, category }: Props) {
  const { data, status } = useQuery("listStoreCategories", listStoreCategories);
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log("data", data);
  console.log("data?.data.categories", data?.data.categories);

  const pillGroupClassname = storeType === "store" ? "gray" : "normal";

  function getCategory() {
    const categoryArray = data?.data.categories;
    const categories = category
      ? data?.data.categories.filter(
          (cat: { name: string }) => cat.name === category
        )
      : categoryArray;
    return categories;
  }

  return (
    <>
      <div className={`pill-group ${pillGroupClassname}`}>
        {status === "error"
          ? "error"
          : status === "loading"
          ? "loading"
          : getCategory().map((category: storeCategoryType) => (
              <Pill
                key={category._id}
                category={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            ))}
      </div>
      <style jsx>
        {`
          .pill-group {
            display: flex;
            align-items: center;
            overflow-x: scroll;
            padding-left: 20px;
          }
          .gray {
            background-color: var(--neutral-gray-2);
            padding: 10px 5px;
          }
        `}
      </style>
    </>
  );
}
