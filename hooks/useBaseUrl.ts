import { updateBaseURL } from "@/redux/ui-slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";

export default function useBaseUrl() {
  const dispatch = useAppDispatch();
  const { baseURL } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (typeof window !== "undefined" && baseURL.length === 0) {
      const windowLocation: any = window.location.href;
      if (
        windowLocation.includes("quick-order.cloudmall.africa") &&
        typeof window !== undefined
      ) {
        dispatch(updateBaseURL("https://api.cloudmall.africa"));
      } else if (
        windowLocation.includes("quick-order.test.cloudmall.africa") ||
        windowLocation.includes("http://localhost:3000/") ||
        windowLocation.includes("/")
      ) {
        dispatch(updateBaseURL("https://cloudmall-africa.herokuapp.com/api"));
      } else if (
        windowLocation.includes("quick-order.local.cloudmall.africa")
      ) {
        dispatch(updateBaseURL("https://localtunnel.nfmshow.com.ng/api"));
      }
    }
  }, []);

  return baseURL;
}
