import { useEffect, useState } from "react";

export default function useBaseUrl() {
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    const windowLocation: any = window.location.href;
    if (
      windowLocation.includes("quick-order.cloudmall.africa") &&
      typeof window !== "undefined"
    ) {
      setBaseURL("https://api.cloudmall.africa");
    } else if (
      windowLocation.includes("quick-order.test.cloudmall.africa") ||
      windowLocation.includes("http://localhost:3000/") ||
      windowLocation.includes("/")
    ) {
      setBaseURL("https://cloudmall-africa.herokuapp.com/api");
    } else if (windowLocation.includes("quick-order.local.cloudmall.africa")) {
      setBaseURL("https://localtunnel.nfmshow.com.ng/api");
    }
  }, []);

  console.log("baseURL", baseURL);

  return { baseURL };
}
