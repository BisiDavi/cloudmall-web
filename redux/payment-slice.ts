/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type paymentType = {
  payment: {
    fwKey: string | null;
    order: any;
    status:
      | "FLUTTERWAVE_SUCCESSFUL_AND_VERIFIED"
      | "FLUTTERWAVE_SUCCESSFUL"
      | null;
  };
};

const initialState: paymentType = {
  payment: {
    fwKey: null,
    order: null,
    status: null,
  },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateFWKeys: (state, action) => {
      state.payment = { ...state.payment, fwKey: action.payload };
    },
    updateOrder: (state, action: PayloadAction<paymentType>) => {
      state.payment = { ...state.payment, order: action.payload };
    },
    updatePaymentStatus: (state, action) => {
      state.payment = { ...state.payment, status: action.payload };
    },
  },
});

export const { updateOrder, updateFWKeys, updatePaymentStatus } =
  paymentSlice.actions;

export default paymentSlice.reducer;
