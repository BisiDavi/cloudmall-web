/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type loginSliceType =
  | {
      email: string;
      phone: string;
    }
  | any;

const initialState: loginSliceType = null;

export const loginSlice = createSlice({
  name: "loginDetails",
  initialState,
  reducers: {
    updateLogin: (state, action: PayloadAction<loginSliceType>) => {
      console.log("action", action);
      state = action.payload;
    },
  },
});

export const { updateLogin } = loginSlice.actions;
export default loginSlice.reducer;
