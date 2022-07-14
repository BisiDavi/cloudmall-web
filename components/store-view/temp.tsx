/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import CategoryPills from "@/components/pills/CategoryPills";
import useStoreRequest from "@/hooks/useStoreRequest";
import { useAppSelector } from "@/hooks/useRedux";
import StoreListLoader from "@/components/loaders/StoreListLoader";
import useBaseUrl from "@/hooks/useBaseUrl";
import { storeType } from "@/types/store-types";
import StoreListView from "@/components/store-view/StoreListView";
import useFetch from "@/hooks/useFetch";

export default function Storeview() {
  const { storeCategory } = useAppSelector((state) => state.category);
  const { categorySearch } = useAppSelector((state) => state.search);
  const [baseURL] = useBaseUrl();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { stores, loading, sendQuery } = useFetch();
  const { listStore } = useStoreRequest();
  const { user } = useAppSelector((state) => state.user);
  const ref: any = useRef(null);
  let storeList: any[] = [];

  useEffect(() => {
    if (stores.length > 0 && !loading) {
      setPageCount(stores[0]?.pageCount);
    }
  }, [loading]);

  console.log("pageCount", pageCount);

  useEffect(() => {
    sendQuery(page);
  }, [page]);

  if (pageCount === page && page !== 1) {
    const storeView = stores.filter(
      (v, i, a) => a.findIndex((v2) => v2.pageNo === v.pageNo) === i
    );
    console.log("storeView", storeView);
    storeView.map((store) => {
      storeList = [...storeList, ...store.stores];
    });
  }

  console.log("dfrd", storeList);

  const coordinates = user?.addresses[0]?.location?.coordinates;

  const handleObserver = useCallback((entries: any[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(page + 1);
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

  const categories =
    storeCategory.length > 0 ? { categoryIds: storeCategory } : "";

  const textSearch = categorySearch.length > 3 ? { text: categorySearch } : "";

  const displayStores: any = () =>
    listStore(baseURL, {
      maxDistance: 3000,
      availablity: "OPEN",
      forceClosed: false,
      pageNo: page,
      pageSize: 20,
      coordinates,
      ...textSearch,
      ...categories,
    });

  const categoryKey = categorySearch
    ? categorySearch
    : storeCategory.length > 0
    ? storeCategory
    : "";

  const { data, status }: any = useQuery(
    [`listStores-${categoryKey}`, categorySearch, storeCategory],
    displayStores,
    {
      enabled: !!baseURL,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div className="store-view">
        <CategoryPills type="store" />
        <div className="list">
          {status === "error" ? (
            "error occured"
          ) : status === "loading" ? (
            <StoreListLoader />
          ) : data?.data?.stores.length > 0 ? (
            data?.data?.stores.map((store: storeType) => {
              return store.isCurrentlyOpen ? (
                <Link
                  key={store._id}
                  passHref
                  href={{
                    pathname: `/store/${store.name}`,
                    query: { store_id: store._id },
                  }}
                >
                  <a>
                    <StoreListView store={store} />
                  </a>
                </Link>
              ) : (
                <StoreListView key={store._id} store={store} status="closed" />
              );
            })
          ) : (
            <div className="no-store">
              <Image
                src="/errorIcon.webp"
                alt="error"
                height={250}
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
