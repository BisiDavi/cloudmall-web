/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type deliveryDetailsType = {
  address: string;
  category: string;
  description: string;
  time: string;
  phone: string;
};

const initialState: any = { deliveryDetails: null };

export const deliveryDetailSlice = createSlice({
  name: "deliveryDetails",
  initialState,
  reducers: {
    updateDeliveryDetail: (
      state,
      action: PayloadAction<deliveryDetailsType>
    ) => {
      state.deliveryDetails = action.payload;
    },
  },
});

export const { updateDeliveryDetail } = deliveryDetailSlice.actions;
export default deliveryDetailSlice.reducer;
