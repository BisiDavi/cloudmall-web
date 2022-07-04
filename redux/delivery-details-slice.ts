/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type deliveryDetailsType =
  | {
      address: string;
      category: string;
      description: string;
      time: string;
      phone: string;
    }
  | any;

const initialState: deliveryDetailsType = null;

export const deliveryDetailSlice = createSlice({
  name: "deliveryDetails",
  initialState,
  reducers: {
    updateDeliveryDetail: (
      state,
      action: PayloadAction<deliveryDetailsType>
    ) => {
      state = action.payload;
    },
  },
});

export const { updateDeliveryDetail } = deliveryDetailSlice.actions;
export default deliveryDetailSlice.reducer;
