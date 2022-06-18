/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";
import { toast } from "react-toastify";

import Button from "@/components/buttons";
import Image from "next/image";
import { autocompleteStyles } from "./autocomplete.style";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { saveUserAddress, updateCoordinates } from "@/redux/location-slice";
import { updateModal } from "@/redux/ui-slice";

declare global {
  interface Window {
    google: any;
  }
}

export default function AutocompleteView() {
  const { address, lat, lng } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  function showModal() {
    if (address) {
      dispatch(updateModal("loginQuestionModal"));
    } else {
      toast.error("Please enter your address");
    }
  }

  console.log(" address, lat, lng", address, lat, lng);

  function autoCompleteHandler(userAddress: string) {
    dispatch(saveUserAddress(userAddress));
  }
  function handleSelect(userAddress: string) {
    dispatch(saveUserAddress(userAddress));
    geocodeByAddress(userAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: { lat: number; lng: number }) =>
        dispatch(updateCoordinates(latLng))
      )
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
            <div
              className="auto-complete input-wrapper"
              style={autocompleteStyles.wrapper}
            >
              <input
                value={address}
                {...getInputProps({
                  placeholder: "9, Omole Estate behind Mayfair, Ile-Ife",
                  className: "location-search-input",
                  label: "Enter your Address",
                })}
              />
              <div
                className="autocomplete-dropdown-container"
                style={autocompleteStyles.dropdown}
              >
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
                  (suggestion: {
                    active: boolean;
                    description: string;
                    placeId: string;
                  }) => {
                    console.log("suggestion", suggestion);
                    const className = suggestion.active
                      ? "list suggestion-item--active"
                      : "list suggestion-item";
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
                        style={autocompleteStyles.dropdownItem}
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

        <Button
          text="Confirm Address"
          className="itemButton autocomplete"
          onClick={showModal}
        />
      </div>
      <style jsx>
        {`
          .autocomplete {
            padding: 20px 30px;
            display: flex;
            flex-direction: column;
            height: 28vh;
          }
          .auto-complete.imput-wrapper {
            position: relative;
          }
          .suggestion-item--active {
            position: absolute;
            top: 40px;
            left: 0px;
          }
        `}
      </style>
    </>
  );
}
