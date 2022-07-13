import { useQuery } from "react-query";
import { useRouter } from "next/router";

import Pill from "@/components/pills";
import { storeCategoryType } from "@/types/store-types";
import PillLoader from "@/components/loaders/PillsLoader";
import useBaseUrl from "@/hooks/useBaseUrl";
import useProductRequest from "@/hooks/useProductRequest";

export default function ProductCategoryPills() {
  const router: any = useRouter();
  const storeId = router?.query?.store_id;

  const [baseURL] = useBaseUrl();
  const { listProductCategories } = useProductRequest();

  const { data, status }: any = useQuery(
    "listProductCategories",
    () => listProductCategories(baseURL, storeId),
    {
      enabled: !!baseURL,
    }
  );

  console.log("data-listProductCategories", data);

  return (
    <>
      {status === "error" ? (
        "error"
      ) : status === "loading" ? (
        <PillLoader />
      ) : (
        <div className="pill-group normal">
          {data?.data?.categories.map((category: storeCategoryType) => (
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
