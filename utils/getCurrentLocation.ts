import {
  updateCoordinates,
  updateUserCurrentLocation,
} from "@/redux/location-slice";

export default function getCurrentLocation(dispatch: any) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      dispatch(
        updateCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      dispatch(updateUserCurrentLocation());
    },
    (error) => {
      console.log("getCurrentLocation-error", error);
      dispatch(
        updateCoordinates({
          lat: 7.5207,
          lng: 4.5303,
        })
      );
      dispatch(updateUserCurrentLocation());
    }
  );
}
