import { listStore } from "@/utils/storeRequest";
import { useQuery } from "react-query";

export default function useStore() {
  function listStores() {}
  const { data, status } = useQuery("listStore", listStore);
}
