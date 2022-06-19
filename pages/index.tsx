/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import Map from "@/components/map";
import AutocompleteView from "@/components/map/autocomplete";
import MapModal from "@/components/modals/MapModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";
import getCurrentLocation from "@/utils/getCurrentLocation";

export default function MapView() {
  const dispatch = useAppDispatch();
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
      <MapModal modal={modal} closeModal={closeModal} />
      <div className="header">
        <h3>Enter your Address</h3>
      </div>
      <Map />
      <AutocompleteView />
      <style jsx>
        {`
          .header {
            height: 7vh;
            align-items: center;
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}
