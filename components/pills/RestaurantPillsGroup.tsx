import { useQuery } from "react-query";

import Pill from "@/components/pills";
import { listStoreCategories } from "@/utils/storeRequest";
import { storeCategoryType } from "@/types/store-types";
import PillLoader from "@/components/loaders/PillsLoader";
import useBaseUrl from "@/hooks/useBaseUrl";

interface Props {
  storeType: "restaurant" | "store";
  category?: string;
}

export default function RestaurantPillsGroup({ storeType, category }: Props) {
  const baseURL = useBaseUrl();

  const { data, status }: any = useQuery(
    "listStoreCategories",
    () => listStoreCategories(baseURL),
    {
      enabled: !!baseURL,
    }
  );

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
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <PillLoader />
      ) : (
        <div className={`pill-group ${pillGroupClassname}`}>
          {getCategory()?.map((category: storeCategoryType) => (
            <Pill key={category._id} category={category} />
          ))}
        </div>
      )}
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
