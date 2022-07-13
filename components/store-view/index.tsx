import { useQuery } from "react-query";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import RestaurantPillsGroup from "@/components/pills/RestaurantPillsGroup";
import StoreviewList from "@/components/store-view/StoreviewList";
import useStoreRequest from "@/hooks/useStoreRequest";
import { storeType } from "@/types/store-types";
import { useAppSelector } from "@/hooks/useRedux";
import StoreListLoader from "@/components/loaders/StoreListLoader";
import useBaseUrl from "@/hooks/useBaseUrl";

export default function Storeview() {
  const { category } = useAppSelector((state) => state.category);
  const { search } = useAppSelector((state) => state.search);
  const [baseURL] = useBaseUrl();
  const { listStore } = useStoreRequest();
  const { user } = useAppSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const ref: any = useRef(null);

  const coordinates = user?.addresses[0]?.location?.coordinates;

  const storeviewFunc: any = () =>
    search.length > 3
      ? listStore(baseURL, { text: search, coordinates })
      : search || category.length > 0
      ? listStore(baseURL, {
          categoryIds: category,
          text: search,
          coordinates,
        })
      : listStore(baseURL, {
          coordinates,
          maxDistance: 3000,
          availablity: "OPEN",
          forceClosed: false,
          pageNo: page,
        });

  const categoryKey = search ? search : category.length > 0 ? category : "";

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersection) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (ref.current) observer.observe(ref.current);
  }, [handleObserver]);

  const { data, status }: any = useQuery(
    [`listStores-${categoryKey}`, page, search, category],
    storeviewFunc,
    {
      enabled: !!baseURL,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="store-view">
        <RestaurantPillsGroup storeType="restaurant" />
        <div className="list">
          {status === "error" ? (
            "error occured"
          ) : status === "loading" ? (
            <StoreListLoader />
          ) : data?.data?.stores.length > 0 ? (
            data?.data?.stores.map((store: storeType) => (
              <StoreviewList store={store} key={store._id} />
            ))
          ) : (
            <div className="no-store">
              <Image
                src="/errorIcon.webp"
                alt="error"
                height={300}
                width={300}
              />
              <h6>No store in your locality yet</h6>
            </div>
          )}
        </div>
        <div className="loader" ref={ref} />
      </div>
      <style jsx>
        {`
          .store-view {
            display: flex;
            flex-direction: column;
            margin-bottom: 100px;
          }
          .list {
            border-top: 1px solid rgba(62, 64, 68, 0.25);
            margin-top: 20px;
          }
          .no-store {
            display: flex;
            align-items: center;
            margin: auto;
            justify-content: center;
            display: flex;
            flex-direction: column;
          }
          .no-store h6 {
            font-size: 16px;
            font-weight: 500;
            color: red;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
