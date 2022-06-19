import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AddressType = { title?: string; location?: string };

type locationState = {
  lat: number;
  lng: number;
  completeAddress: Array<AddressType>;
  incompleteAddress: AddressType;
  address: string;
};

const initialState: locationState = {
  lat: 7.5207,
  lng: 4.5303,
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
    updateCoordinates: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
    updateAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    saveIncompleteAddress: (state, action: PayloadAction<AddressType>) => {
      state.incompleteAddress = action.payload;
    },
  },
});

export const {
  saveCompleteAddress,
  updateAddress,
  updateCoordinates,
  saveIncompleteAddress,
} = locationSlice.actions;

export default locationSlice.reducer;
