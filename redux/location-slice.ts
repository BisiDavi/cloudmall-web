import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = { title: string; location: string };

type locationState = {
  lat: number;
  lng: number;
  address: Array<AddressType>;
  tempAddress: string;
};

const initialState: locationState = {
  lat: 7.5207,
  lng: 4.5303,
  address: [],
  tempAddress: "",
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
    updateTempAddress: (state, action: PayloadAction<string>) => {
      state.tempAddress = action.payload;
    },
  },
});

export const { saveUserAddress, updateCoordinates, updateTempAddress } =
  locationSlice.actions;

export default locationSlice.reducer;
