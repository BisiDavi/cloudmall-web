import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = { index: number; location: string };
type AddressTitle = { title: string; index: number };

type locationState = {
  lat: number;
  lng: number;
  address: Array<AddressType>;
  tempAddress: string;
  addressTitle: Array<{ title: string; index: number }>;
  count: number;
};

const initialState: locationState = {
  lat: 7.5207,
  lng: 4.5303,
  address: [],
  tempAddress: "",
  addressTitle: [],
  count: 0,
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
    updateAddressTitle: (state, action: PayloadAction<AddressTitle>) => {
      state.addressTitle = [...state.addressTitle, action.payload];
    },
    updateCount: (state) => {
      state.count = state.count + 1;
    },
    resetCount: (state) => {
      state.count = 0;
    },
  },
});

export const {
  saveUserAddress,
  updateCoordinates,
  updateTempAddress,
  updateAddressTitle,
  updateCount,
  resetCount,
} = locationSlice.actions;

export default locationSlice.reducer;
