import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

const renderStatus = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <p>loading...</p>;
    case Status.FAILURE:
      return <p>error occured</p>;
    case Status.SUCCESS:
      return <p>success</p>;
  }
};
export default function Map() {
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
  const [map, setMap] = useState();

  console.log("map", map);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: {
            lat: 7.5207,
            lng: 4.5303,
          },
          zoom: 12,
        })
      );
    }
  }, [ref, map]);

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
