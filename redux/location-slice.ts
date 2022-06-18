import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = { title: string; location: string };

type locationState = {
  lat: number;
  lng: number;
  address: Array<AddressType>;
};

const initialState: locationState = {
  lat: 7.5207,
  lng: 4.5303,
  address: [],
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    saveUserAddress: (state, action: PayloadAction<AddressType>) => {
      state.address = [...state.address, action.payload];
    },
    updateCoordinates: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { saveUserAddress, updateCoordinates } = locationSlice.actions;

export default locationSlice.reducer;
