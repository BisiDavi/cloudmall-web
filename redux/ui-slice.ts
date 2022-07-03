/* eslint-disable no-param-reassign */
import { modalType } from "@/types/modal-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type uiState = {
  modal: modalType;
};

const initialState: uiState = {
  modal: null,
};

export const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<modalType>) => {
      state.modal = action.payload;
    },
  },
});

export const { updateModal } = uiSlice.actions;

export default uiSlice.reducer;
