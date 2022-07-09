/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import Storeview from "@/components/store-view";
import useBaseUrl from "@/hooks/useBaseUrl";
import useToast from "@/hooks/useToast";
import StoreLayoutPage from "@/layout/store-layout";
import { whatsappSignin } from "@/utils/authRequest";

export default function Home() {
  const { baseURL } = useBaseUrl();
  const [waCode, setWaCode] = useState("");
  const toastID = useRef(null);
  const { loadingToast, updateToast } = useToast();

  useEffect(() => {
    const WACode = window.location.href.split("?waCode=")[1];
    if (WACode) {
      setWaCode(WACode);
    }
  }, []);

  console.log("waCode", waCode);

  useEffect(() => {
    if (waCode?.length > 0) {
      if (baseURL.length === 0 && typeof window !== "undefined") {
        loadingToast(toastID);
        whatsappSignin(baseURL, {
          waCode,
          rememberMe: true,
        })
          .then((response) => {
            updateToast(toastID, "success", response.data.message);
          })
          .catch((error) => {
            console.log("error", error);
            updateToast(toastID, "error", error?.data);
          });
      }
    }
  }, [baseURL, waCode]);

  return (
    <StoreLayoutPage title="Cloudmall Africa" padding="0px" showArrow={false}>
      <Storeview />
    </StoreLayoutPage>
  );
}
