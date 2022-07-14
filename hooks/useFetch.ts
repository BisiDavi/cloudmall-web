/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useAppSelector } from "@/hooks/useRedux";
import useStoreRequest from "./useStoreRequest";
import useBaseUrl from "./useBaseUrl";

function useFetch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const { listStore } = useStoreRequest();
  const { storeCategory } = useAppSelector((state) => state.category);
  const { categorySearch } = useAppSelector((state) => state.search);
  const { user } = useAppSelector((state) => state.user);
  const [baseURL] = useBaseUrl();

  const coordinates = user?.addresses[0]?.location?.coordinates;

  const categories =
    storeCategory.length > 0 ? { categoryIds: storeCategory } : "";

  const textSearch = categorySearch.length > 3 ? { text: categorySearch } : "";

  const displayStores = (page: number) =>
    listStore(baseURL, {
      maxDistance: 3000,
      availablity: "OPEN",
      forceClosed: false,
      pageNo: page,
      coordinates,
      ...textSearch,
      ...categories,
    });

  function sendQuery(page: number) {
    setLoading(true);
    displayStores(page)
      .then((response) => {
        setLoading(false);
        console.log("storesrer", stores);
        if (stores.length > 0) {
          stores.filter((store) => {
            console.log("store.pageNo", store.pageNo);
            console.log("response.data.pageNo", response.data.pageNo);
            if (store?.pageNo !== response.data.pageNo) {
              setStores((prev) => [...prev, response?.data]);
            }
          });
        } else {
          setStores((prev) => [...prev, response?.data]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }

  return { loading, error, sendQuery, stores };
}

export default useFetch;
