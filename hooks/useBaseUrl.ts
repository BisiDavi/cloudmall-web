import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useBaseUrl() {
  const [baseURL, setBaseURL] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("quick-order.cloudmall.africa")) {
      setBaseURL("https://api.cloudmall.africa");
    } else if (
      router.pathname.includes("quick-order.test.cloudmall.africa") ||
      router.pathname.includes("http://localhost:3000/") ||
      router.pathname.includes("/")
    ) {
      setBaseURL("https://cloudmall-africa.herokuapp.com/api");
    } else if (router.pathname.includes("quick-order.local.cloudmall.africa")) {
      setBaseURL("https://localtunnel.nfmshow.com.ng/api");
    }
  }, [router.pathname]);

  console.log("baseURL", baseURL);

  return { baseURL };
}
