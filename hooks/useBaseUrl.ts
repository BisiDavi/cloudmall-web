import { useRouter } from "next/router";

export default function useBaseUrl() {
  const router = useRouter();

  let baseURL = "";

  if (router.pathname.includes("quick-order.cloudmall.africa")) {
    baseURL = "https://api.cloudmall.africa";
  }

  if (
    router.pathname.includes("quick-order.test.cloudmall.africa") ||
    router.pathname.includes("http://localhost:3000")
  ) {
    baseURL = "https://cloudmall-africa.herokuapp.com/api";
  }

  if (router.pathname.includes("quick-order.local.cloudmall.africa")) {
    baseURL = "https://localtunnel.nfmshow.com.ng/api";
  }
  return { baseURL };
}
