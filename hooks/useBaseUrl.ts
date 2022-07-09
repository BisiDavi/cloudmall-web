import { useEffect } from "react";

export default function useBaseUrl(): any {
  // const [baseURL, setBaseURL] = useState("");

  useEffect((): any => {
    const windowLocation: any = window.location.href;
    if (
      windowLocation.includes("quick-order.cloudmall.africa") &&
      typeof window !== "undefined"
    ) {
      return "https://api.cloudmall.africa";
    } else if (
      windowLocation.includes("quick-order.test.cloudmall.africa") ||
      windowLocation.includes("http://localhost:3000/") ||
      windowLocation.includes("/")
    ) {
      return "https://cloudmall-africa.herokuapp.com/api";
    } else if (windowLocation.includes("quick-order.local.cloudmall.africa")) {
      return "https://localtunnel.nfmshow.com.ng/api";
    }
  }, []);
}
