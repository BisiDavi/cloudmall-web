/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type loginSliceType =
  | {
      email: string;
      phone: string;
      token: string;
    }
  | any;

const initialState = { loginDetails: null };

export const loginSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    updateLogin: (state: any, action: PayloadAction<loginSliceType>) => {
      console.log("action", action);
      state.loginDetails = { ...state.loginDetails, ...action.payload };
    },
    updateAuthToken: (state: any, action) => {
      state.loginDetails = { ...state.loginDetails, token: action.payload };
    },
  },
});

export const { updateLogin, updateAuthToken } = loginSlice.actions;
export default loginSlice.reducer;
