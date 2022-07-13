import { memo } from "react";

import { storeCategoryType } from "@/types/store-types";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  updateStoreCategory,
  updateProductCategory,
} from "@/redux/category-slice";

interface PillProps {
  category: storeCategoryType;
  categoryType: "store" | "product";
}

function PillComponent({ category, categoryType }: PillProps) {
  const { storeCategory, productCategory } = useAppSelector(
    (state) => state.category
  );
  const dispatch = useAppDispatch();

  console.log("categoryType", categoryType);
  console.log(
    "storeCategory, productCategory ",
    storeCategory,
    productCategory
  );

  function checkActiveCategory(categoryTypeArray: string[]) {
    return categoryTypeArray.includes(category._id) ? "active" : "inactive";
  }

  const selectedClassName =
    categoryType === "product"
      ? checkActiveCategory(productCategory)
      : checkActiveCategory(storeCategory);

  function onClickHandler() {
    console.log("categoryType was clicked");
    if (categoryType === "product") {
      return dispatch(updateProductCategory(category._id));
    } else {
      return dispatch(updateStoreCategory(category._id));
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={onClickHandler}
        className={`pill ${selectedClassName}`}
      >
        {category.name}
      </button>
      <style jsx>
        {`
          .pill {
            border: 1px solid rgba(0, 0, 0, 0.4);
            border-radius: 5px;
            background-color: white;
            color: var(--mall-blue);
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            letter-spacing: 0.0125em;
            min-width: fit-content;
            margin-right: 20px;
            padding: 10px;
          }
          .pill.active {
            background-color: var(--mall-blue);
            color: white;
          }
          .pill.inactive {
            background-color: white;
            color: var(--mall-blue);
          }
          .link {
            margin-right: 20px;
            padding: 4px 10px;
          }
          .link.active {
            background-color: var(--mall-blue);
            color: white;
            border: none;
            border-radius: 5px;
          }
          .link.inactive {
            color: var(--mall-blue);
            border: none;
          }
        `}
      </style>
    </>
  );
}
const Pill = memo(PillComponent);
export default Pill;
