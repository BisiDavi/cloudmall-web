/* eslint-disable no-param-reassign */
import { modalType } from "@/types/modal-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type uiState = {
  modal: modalType;
  baseURL: string;
};

const initialState: uiState = {
  modal: null,
  baseURL: "",
};

export const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<modalType>) => {
      state.modal = action.payload;
    },
    updateBaseURL: (state, action) => {
      state.baseURL = action.payload;
    },
  },
});

export const { updateModal, updateBaseURL } = uiSlice.actions;

export default uiSlice.reducer;
