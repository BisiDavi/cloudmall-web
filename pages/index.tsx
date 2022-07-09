/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

import Storeview from "@/components/store-view";
import useBaseUrl from "@/hooks/useBaseUrl";
import useToast from "@/hooks/useToast";
import StoreLayoutPage from "@/layout/store-layout";
import { whatsappSignin } from "@/utils/authRequest";

export default function Home() {
  const baseURL = useBaseUrl();
  const toastID = useRef(null);
  const { loadingToast, updateToast } = useToast();

  console.log("baseURL", baseURL);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const waCode = window.location.href.split("?waCode=")[1];
  //     console.log("waCode", waCode);

  //     if (baseURL?.length > 0 && typeof window !== "undefined") {
  //       loadingToast(toastID);
  //       whatsappSignin(baseURL, {
  //         waCode,
  //         rememberMe: true,
  //       })
  //         .then((response) => {
  //           console.log(response, "response-whatsappSignin");
  //           updateToast(toastID, "success", `Welcome ${response.data.user.surname} ${response.data.user.firstname}`);
  //         })
  //         .catch((error) => {
  //           console.log("error-whatsappSignin", error);
  //           updateToast(toastID, "error", error?.data);
  //         });
  //     }
  //   }
  // }, [baseURL]);

  return (
    <StoreLayoutPage title="Cloudmall Africa" padding="0px" showArrow={false}>
      <Storeview />
    </StoreLayoutPage>
  );
}
