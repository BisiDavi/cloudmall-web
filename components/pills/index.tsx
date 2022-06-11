import { Dispatch, memo, SetStateAction } from "react";

import { storeCategoryType } from "@/types/store-types";

interface PillProps {
  category: storeCategoryType;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}

function PillComponent({
  category,
  selectedCategory,
  setSelectedCategory,
}: PillProps) {
  const selectedClassName =
    selectedCategory === category.name ? "active" : "inactive";

  function onClickHandler() {
    setSelectedCategory(category.name);
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
