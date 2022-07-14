/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useRouter } from "next/router";
import Script from "next/script";
import dynamic from "next/dynamic";

import useMapview from "@/hooks/useMapview";
import { useEffect } from "react";
import { updateModal } from "@/redux/ui-slice";
import { useAppDispatch } from "@/hooks/useRedux";
import { useRouter } from "next/router";

const DynamicAutocomplete = dynamic(
  () =>
    import(
      /* webpackChunkName: 'autocomplete' */ "@/components/map/autocomplete"
    ),
  { ssr: false }
);

const DynamicMapModal = dynamic(
  () =>
    import(/* webpackChunkName: 'MapModal' */ "@/components/modals/MapModal"),
  { ssr: false }
);

const DynamicMap = dynamic(
  () => import(/* webpackChunkName: 'Map' */ "@/components/map"),
  {
    ssr: false,
  }
);

export default function MapView() {
  const { closeModal, loadMap, updateAutocompleteStatus, modal } = useMapview();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateModal("userAddresses"));
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={(response) => {
          if (response) {
            console.log("response", response);
            updateAutocompleteStatus(true);
          }
        }}
        onError={(err) => {
          console.log("err", err);
          updateAutocompleteStatus(false);
          router.reload();
        }}
      />
      {modal === "userAddresses" && (
        <DynamicMapModal modal={modal} closeModal={closeModal} />
      )}
      <div className="map-header">
        <h3>Enter your Address</h3>
      </div>
      <DynamicMap />
      {loadMap ? (
        <DynamicAutocomplete />
      ) : (
        <img src="/loading.gif" alt="loading-gif" className="loading-icon" />
      )}
    </>
  );
}
