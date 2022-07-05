/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type paymentType = {
  payment: {
    fwKey: string | null;
    order: any;
  };
};

const initialState: paymentType = {
  payment: {
    fwKey: null,
    order: null,
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
  },
});

export const { updateOrder, updateFWKeys } = paymentSlice.actions;

export default paymentSlice.reducer;
