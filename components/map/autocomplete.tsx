import AutoComplete from "react-google-autocomplete";

import Button from "@/components/buttons";

export default function AutocompleteView() {
  return (
    <>
      <div className="autocomplete">
        <AutoComplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
          onPlaceSelected={(place) => console.log("places", place)}
          placeholder="9, Omole Estate behind Mayfair, Ile-Ife"
          options={{
            types: ["(address)"],
            componentRestrictions: { country: "ng" },
          }}
          className="autocomplete"
        />
        <Button text="Confirm Address" className="itemButton autocomplete" />
      </div>
      <style jsx>
        {`
          .autocomplete {
            padding: 15px 30px;
            display: flex;
            flex-direction: column;
            height: 28vh;
          }
        `}
      </style>
    </>
  );
}
