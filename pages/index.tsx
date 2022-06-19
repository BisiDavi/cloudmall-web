/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";
import getCurrentLocation from "@/utils/getCurrentLocation";

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
  () => import(/* webpackChunkName: 'Map' */ "@/components/map")
);

export default function MapView() {
  const dispatch = useAppDispatch();
  const [loadAutocomplete, setLoadAutocomplete] = useState(false);
  const { modal } = useAppSelector((state) => state.ui);
  const { useUserCurrentLocation } = useAppSelector((state) => state.location);

  useEffect(() => {
    if (!useUserCurrentLocation) {
      getCurrentLocation(dispatch);
    }
  }, [useUserCurrentLocation]);

  function closeModal() {
    dispatch(updateModal(null));
  }

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={(response) => {
          if (response) {
            setLoadAutocomplete(true);
          }
        }}
        onError={() => setLoadAutocomplete(false)}
      />
      <DynamicMapModal modal={modal} closeModal={closeModal} />
      <div className="header">
        <h3>Enter your Address</h3>
      </div>
      <DynamicMap />
      {loadAutocomplete ? (
        <DynamicAutocomplete />
      ) : (
        <img src="/loading.gif" alt="loading-gif" className="loading-icon" />
      )}
      <style jsx>
        {`
          .header {
            height: 7vh;
            align-items: center;
            display: flex;
            justify-content: center;
          }
          .loading-icon {
            display: flex;
            align-items: center;
            margin: auto;
          }
        `}
      </style>
    </>
  );
}
