/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "react-query";
import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

import CategoryPills from "@/components/pills/CategoryPills";
import useStoreRequest from "@/hooks/useStoreRequest";
import { useAppSelector } from "@/hooks/useRedux";
import StoreListLoader from "@/components/loaders/StoreListLoader";
import { storeType } from "@/types/store-types";
import StoreListView from "@/components/store-view/StoreListView";
import useAddressRequest from "@/hooks/useAddressRequest";

export default function Storeview() {
  const { storeCategory } = useAppSelector((state) => state.category);
  const { categorySearch } = useAppSelector((state) => state.search);
  const { listStore } = useStoreRequest();
  const ref: any = useRef(null);
  const { getUserProfile } = useAddressRequest();
  const { data: addressData, status: addressStatus } = useQuery(
    "getUserProfile",
    getUserProfile,
    {
      staleTime: Infinity,
    }
  );

  const addresses = addressData?.data.user?.addresses;

  const defaultAddress =
    addressStatus === "success"
      ? addresses?.filter((address: any) => address.isDefault)
      : [];

  const mapCoordinates = defaultAddress[0]?.location.coordinates;

  const categories =
    storeCategory.length > 0 ? { categoryIds: storeCategory } : "";

  const textSearch = categorySearch.length > 3 ? { text: categorySearch } : "";

  const displayStores: any = () =>
    listStore({
      maxDistance: 3000,
      availablity: "ANY",
      forceClosed: false,
      pageNo: 1,
      pageSize: 20,
      coordinates: mapCoordinates,
      ...textSearch,
      ...categories,
    });

  const categoryKey = categorySearch
    ? categorySearch
    : storeCategory.length > 0
    ? storeCategory
    : "";

  const { data, status, error }: any = useQuery(
    [`listStores-${categoryKey}`, categorySearch, storeCategory],
    displayStores,
    {
      enabled: !!(mapCoordinates?.length > 0),
    }
  );

  console.log("status", status, "error", error);

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
