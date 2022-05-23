import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type locationState = {
  lat: number | null;
  lng: number | null;
  address: string | null;
};

const initialState: locationState = {
  lat: null,
  lng: null,
  address: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    saveUserAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { saveUserAddress } = locationSlice.actions;

export default locationSlice.reducer;