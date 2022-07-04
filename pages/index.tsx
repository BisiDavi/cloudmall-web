/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Script from "next/script";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import useMapview from "@/hooks/useMapview";
import { useAppSelector } from "@/hooks/useRedux";

const DynamicAutocomplete = dynamic(
  () =>
    import(
      /* webpackChunkName: 'autocomplete' */ "@/components/map/autocomplete"
    ),
  { ssr: false }
);

const DynamicMapModal = dynamic(
  () =>
    import(/* webpackChunkName: 'MapModal' */ "@/components/modals/MapModal")
);

const DynamicMap = dynamic(
  () => import(/* webpackChunkName: 'Map' */ "@/components/map"),
  {
    ssr: false,
  }
);

export default function MapView() {
  const { closeModal, loadAutocomplete, updateAutocompleteStatus, modal } =
    useMapview();
  const { completeAddress } = useAppSelector((state) => state.location);
  const router = useRouter();

  useEffect(() => {
    if (completeAddress.length !== 0) {
      router.push("/store-view");
    }
  }, []);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={(response) => {
          if (response) {
            updateAutocompleteStatus(true);
          }
        }}
        onError={() => updateAutocompleteStatus(false)}
      />
      <DynamicMapModal modal={modal} closeModal={closeModal} />
      <div className="map-header">
        <h3>Enter your Address</h3>
      </div>
      <DynamicMap />
      {loadAutocomplete ? (
        <DynamicAutocomplete />
      ) : (
        <img src="/loading.gif" alt="loading-gif" className="loading-icon" />
      )}
    </>
  );
}
