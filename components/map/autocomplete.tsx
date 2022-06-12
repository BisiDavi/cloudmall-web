/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";

import Button from "@/components/buttons";
import { useState } from "react";
import Image from "next/image";

declare global {
  interface Window {
    google: any;
  }
}

export default function AutocompleteView() {
  const [address, setAddress] = useState("");

  function autoCompleteHandler(userAddress: string) {
    setAddress(userAddress);
  }
  function handleSelect(userAddress: string) {
    geocodeByAddress(userAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => console.log("success", latLng))
      .catch((error: any) => console.log("error", error));
  }
  return (
    <>
      <Script
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&libraries=places&sensor=true`}
        strategy="beforeInteractive"
      />
      <div className="autocomplete">
        <PlacesAutocomplete
          value={address}
          onChange={autoCompleteHandler}
          onSelect={handleSelect}
          debounce={400}
          searchOptions={{
            componentRestrictions: { country: "ng" },
          }}
          placeholder="9, Omole Estate behind Mayfair, Ile-Ife"
          className="autocomplete"
          shouldFetchSuggestions={address.length > 3}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }: any) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "9, Omole Estate behind Mayfair, Ile-Ife",
                  className: "location-search-input",
                  label: "Enter your Address",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && (
                  <Image
                    src="/loading.gif"
                    height={40}
                    width={150}
                    alt="loading icon"
                    layout="responsive"
                  />
                )}
                {suggestions.map(
                  (
                    suggestion: {
                      active: boolean;
                      description: string;
                      placeId: string;
                    },
                    index: number
                  ) => {
                    console.log("suggestion", suggestion);
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Button text="Confirm Address" className="itemButton autocomplete" />
      </div>
      <style jsx>
        {`
          .autocomplete {
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            height: 28vh;
          }
        `}
      </style>
    </>
  );
}
