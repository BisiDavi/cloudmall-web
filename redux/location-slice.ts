/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = {
  title?: string;
  location?: string;
  lat?: number;
  lng?: number;
 };

type locationState = {
  lat: number;
  lng: number;
  completeAddress: Array<AddressType>;
  incompleteAddress: AddressType;
  address: string;
  useUserCurrentLocation: boolean;
};

const initialState: locationState = {
  lat: 7.5207,
  lng: 4.5303,
  useUserCurrentLocation: false,
  completeAddress: [],
  incompleteAddress: {},
  address: "",
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    saveCompleteAddress: (state, action: PayloadAction<AddressType>) => {
      state.completeAddress = [...state.completeAddress, action.payload];
    },
    updateDefaultCoordinates: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    updateCompletedAddress: (
      state,
      action: PayloadAction<{
        index: number;
        address: AddressType;
      }>
    ) => {
      state.completeAddress[action.payload.index] = action.payload.address;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    saveIncompleteAddress: (state, action: PayloadAction<AddressType>) => {
      state.incompleteAddress = action.payload;
    },
    updateUserCurrentLocation: (state) => {
      state.useUserCurrentLocation = true;
    },
  },
});

export const {
  saveCompleteAddress,
  updateAddress,
  updateDefaultCoordinates,
  saveIncompleteAddress,
  updateCompletedAddress,
  updateUserCurrentLocation,
} = locationSlice.actions;

export default locationSlice.reducer;
