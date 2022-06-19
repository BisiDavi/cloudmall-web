/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { toast } from "react-toastify";

import Button from "@/components/buttons";
import { autocompleteStyles } from "./autocomplete.style";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  updateDefaultCoordinates,
  saveIncompleteAddress,
  updateAddress,
  saveCompleteAddress,
} from "@/redux/location-slice";
import { updateModal } from "@/redux/ui-slice";
import { memo } from "react";

declare global {
  interface Window {
    google: any;
  }
}

function AutocompleteViewComponent() {
  const locationDetails = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  const { address } = locationDetails;

  console.log("locationDetails", locationDetails);

  function showModal() {
    if (address.length > 0) {
      dispatch(updateModal("loginQuestionModal"));
    } else {
      toast.error("Please enter your address");
    }
  }

  function autoCompleteHandler(userAddress: string) {
    dispatch(updateAddress(userAddress));
  }

  function handleSelect(userAddress: string) {
    dispatch(updateAddress(userAddress));
    geocodeByAddress(userAddress)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: { lat: number; lng: number }) => {
        console.log("www-latLng", latLng);
        dispatch(updateDefaultCoordinates(latLng));
        dispatch(
          saveIncompleteAddress({
            location: userAddress,
            title: "",
            lat: latLng.lat,
            lng: latLng.lng,
          })
        );
        dispatch(
          saveCompleteAddress({
            location: userAddress,
            title: "",
            lat: latLng.lat,
            lng: latLng.lng,
          })
        );
      })
      .catch((error: any) => console.log("error", error));
  }
  return (
    <>
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
                  <img
                    src="/loading.gif"
                    height={40}
                    width={100}
                    className="loadingImage"
                    alt="loading icon"
                  />
                )}
                {suggestions.map(
                  (suggestion: {
                    active: boolean;
                    description: string;
                    placeId: string;
                  }) => {
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
          .auto-complete.input-wrapper {
            position: relative;
          }
          .loadingImage {
            display: flex;
            margin: auto;
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

const AutocompleteView = memo(AutocompleteViewComponent);
export default AutocompleteView;
