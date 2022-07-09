/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import Storeview from "@/components/store-view";
import useBaseUrl from "@/hooks/useBaseUrl";
import useToast from "@/hooks/useToast";
import StoreLayoutPage from "@/layout/store-layout";
import { whatsappSignin } from "@/utils/authRequest";

export default function Home() {
  const router = useRouter();
  const { baseURL } = useBaseUrl();
  const waCode: string | any = router.query?.waCode;
  const toastID = useRef(null);
  const { loadingToast, updateToast } = useToast();

  console.log("baseURL", baseURL);

  useEffect(() => {
    if (waCode && baseURL.length === 0) {
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
          updateToast(toastID, "error", error?.response?.data.message);
        });
    }
  }, [waCode, baseURL]);

  return (
    <StoreLayoutPage title="Cloudmall Africa" padding="0px" showArrow={false}>
      <Storeview />
    </StoreLayoutPage>
  );
}
