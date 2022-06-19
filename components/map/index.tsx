/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import { memo, useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { useAppSelector } from "@/hooks/useRedux";

const renderStatus = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <img src="/loading.gif" alt="loading icon" />;
    case Status.FAILURE:
      return <p>error occured</p>;
    case Status.SUCCESS:
      return <p>success</p>;
  }
};
function MapCompmonent() {
  return (
    <Wrapper
      apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
      render={renderStatus}
    >
      <GoogleMap />
    </Wrapper>
  );
}

declare global {
  interface Window {
    google: any;
  }
}

function GoogleMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [, setMap] = useState(null);
  const { address, lat, lng } = useAppSelector((state) => state.location);

  const zoomFactor = address ? 15 : 12;

  useEffect(() => {
    if (ref.current) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: {
            lat,
            lng,
          },
          zoom: zoomFactor,
        })
      );
    }
  }, [address, lat, lng, zoomFactor]);

  return (
    <>
      <div ref={ref} id="google-map" className="googleMap" />
      <style jsx>
        {`
          .googleMap {
            height: 65vh;
            width: 100%;
          }
        `}
      </style>
    </>
  );
}

const Map = memo(MapCompmonent);
export default Map;
