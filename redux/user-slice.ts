/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

type userState = {
  user: {
    _id: string;
    token: string;
    email: string;
    walletBalance: number;
    firstname?: string;
    surname?: string;
    phonenumber?: string;
    whatsapp?: string;
    addresses: any[];
  } | null;
};

const initialState: userState = { user: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
