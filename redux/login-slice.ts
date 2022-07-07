/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type loginSliceType = {
  user: {
    email: string;
    phone: string;
    name: string;
    id: string;
    walletBalance: string;
  };
  whatsappLogin?: boolean;
  token: string;
} | null;

const initialState = { loginDetails: null };

export const loginSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    updateLogin: (state: any, action: PayloadAction<loginSliceType>) => {
      state.loginDetails = action.payload;
    },
  },
});

export const { updateLogin } = loginSlice.actions;
export default loginSlice.reducer;
