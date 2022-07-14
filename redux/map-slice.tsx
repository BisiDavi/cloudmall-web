/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = {
  title?: string;
  location?: string;
  lat?: number | null;
  lng?: number | null;
};

type mapState = {
  lat: number | null;
  lng: number | null;
  completeAddress: Array<AddressType>;
  incompleteAddress: AddressType;
  address: string;
  useUserCurrentLocation: boolean;
  loadMap: boolean;
};

const initialState: mapState = {
  lat: null,
  lng: null,
  useUserCurrentLocation: false,
  completeAddress: [],
  incompleteAddress: {},
  address: "",
  loadMap: false,
};

export const mapSlice = createSlice({
  name: "map",
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
    updateLoadMap: (state, action) => {
      state.loadMap = action.payload;
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
  updateLoadMap,
} = mapSlice.actions;

export default mapSlice.reducer;
