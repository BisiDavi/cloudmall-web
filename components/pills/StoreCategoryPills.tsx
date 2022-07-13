import { useQuery } from "react-query";

import Pill from "@/components/pills";
import { storeCategoryType } from "@/types/store-types";
import PillLoader from "@/components/loaders/PillsLoader";
import useBaseUrl from "@/hooks/useBaseUrl";
import useStoreRequest from "@/hooks/useStoreRequest";

export default function StoreCategoryPills() {
  const [baseURL] = useBaseUrl();
  const { listStoreCategories } = useStoreRequest();

  const { data, status }: any = useQuery(
    "listStoreCategories",
    () => listStoreCategories(baseURL),
    {
      enabled: !!baseURL,
    }
  );

  return (
    <>
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <PillLoader />
      ) : (
        <div className={`pill-group gray`}>
          {data?.data?.categories.map((category: storeCategoryType) => (
            <Pill key={category._id} category={category} categoryType="store" />
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
