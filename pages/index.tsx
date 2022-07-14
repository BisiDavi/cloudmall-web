/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";

import Storeview from "@/components/store-view";
import useBaseUrl from "@/hooks/useBaseUrl";
import useToast from "@/hooks/useToast";
import StoreLayoutPage from "@/layout/store-layout";
import { whatsappSignin } from "@/utils/authRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateUserDetails } from "@/redux/user-slice";
import { updateDefaultCoordinates } from "@/redux/map-slice";
import useAddressRequest from "@/hooks/useAddressRequest";

export default function Home() {
  const [baseURL] = useBaseUrl();
  const toastID = useRef(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { getUserProfile } = useAddressRequest();
  const { data, status } = useQuery("getUserProfile", getUserProfile);
  const { loadingToast, updateToast } = useToast();

  const addresses = data?.data.user?.addresses;
  const defaultAddress =
    status === "success"
      ? addresses?.filter((address: any) => address.isDefault)
      : [];

  console.log("addresses-status", defaultAddress);

  useEffect(() => {
    if (typeof window !== "undefined" && baseURL?.length > 0 && user === null) {
      const waCode = window.location.href.split("?waCode=")[1];
      loadingToast(toastID);
      whatsappSignin(baseURL, {
        waCode,
        rememberMe: true,
      })
        .then((response) => {
          console.log(response, "response-whatsappSignin");
          const coordinates =
            response.data.user?.addresses[0]?.location?.coordinates;

          const userSurName = response.data.user.surname
            ? response.data.user.surname
            : "";
          const userFirstName = response.data.user.firstname
            ? response.data.user.firstname
            : "";
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
          dispatch(
            updateDefaultCoordinates({
              lat: coordinates[1],
              lng: coordinates[0],
            })
          );
          updateToast(
            toastID,
            "success",
            `Welcome ${userSurName} ${userFirstName}`
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
