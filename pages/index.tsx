import Map from "@/components/map";
import AutocompleteView from "@/components/map/autocomplete";
import MapModal from "@/components/modals/MapModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateModal } from "@/redux/ui-slice";

export default function MapView() {
  const dispatch = useAppDispatch();
  const { modal } = useAppSelector((state) => state.ui);
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
