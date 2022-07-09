/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

import Storeview from "@/components/store-view";
import useBaseUrl from "@/hooks/useBaseUrl";
import useToast from "@/hooks/useToast";
import StoreLayoutPage from "@/layout/store-layout";
import { whatsappSignin } from "@/utils/authRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateUserDetails } from "@/redux/user-slice";

export default function Home() {
  const baseURL = useBaseUrl();
  const toastID = useRef(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { loadingToast, updateToast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && baseURL?.length > 0 && user === null) {
      const waCode = window.location.href.split("?waCode=")[1];
      console.log("waCode", waCode);
      loadingToast(toastID);
      whatsappSignin(baseURL, {
        waCode,
        rememberMe: true,
      })
        .then((response) => {
          console.log(response, "response-whatsappSignin");
          dispatch(
            updateUserDetails({
              _id: response.data.user._id,
              token: response.data.token,
              email: response.data.user.email,
              firstname: response.data.user.firstname,
              surname: response.data.user.surname,
              phonenumber: response.data.user.phonenumber,
              addresses: response.data.user.addresses,
              walletBalance: response.data.user.walletBalance,
            })
          );
          updateToast(
            toastID,
            "success",
            `Welcome ${response.data.user.surname} ${response.data.user.firstname}`
          );
        })
        .catch((error) => {
          console.log("error-whatsappSignin", error);
          updateToast(toastID, "error", error?.data);
        });
    }
  }, [baseURL]);

  return (
    <StoreLayoutPage title="Cloudmall Africa" padding="0px" showArrow={false}>
      <Storeview />
    </StoreLayoutPage>
  );
}
