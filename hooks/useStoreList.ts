import { useInfiniteQuery } from "react-query";
import { useState } from "react";

import useStoreRequest from "@/hooks/useStoreRequest";
import useBaseUrl from "@/hooks/useBaseUrl";
import { useAppSelector } from "@/hooks/useRedux";

export default function useStoreList() {
  const { listStore } = useStoreRequest();
  const [baseURL] = useBaseUrl();
  const [page, setPage] = useState(1);
  const { user } = useAppSelector((state) => state.user);
  const { storeCategory } = useAppSelector((state) => state.category);
  const { categorySearch } = useAppSelector((state) => state.search);

  const coordinates = user?.addresses[0]?.location?.coordinates;

  const categories =
    storeCategory.length > 0 ? { categoryIds: storeCategory } : "";

  const textSearch = categorySearch.length > 3 ? { text: categorySearch } : "";

  const displayStores: any = ({ pageParam = 1 }) => {
    console.log("pageParam", pageParam);
    return listStore(baseURL, {
      maxDistance: 3000,
      availablity: "OPEN",
      forceClosed: false,
      pageNo: pageParam,
      coordinates,
      ...textSearch,
      ...categories,
    });
  };
  const infiniteData: any = useInfiniteQuery("storeList", displayStores, {
    enabled: !!baseURL,
    keepPreviousData: true,
    getNextPageParam: () => page,
  });

  return [infiniteData, setPage, page];
}
