import Map from "@/components/map";
import AutocompleteView from "@/components/map/autocomplete";

export default function MapView() {
  return (
    <>
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
