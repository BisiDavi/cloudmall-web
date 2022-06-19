import { useAppSelector } from "@/hooks/useRedux";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const renderStatus = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <Image src="/loading.gif" height={150} width={150} alt="loading icon" />
      );
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
