import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type uiState = {
  modal: {
    type: "loginQuestionModal" | null;
    visible: boolean;
  };
};

const initialState: uiState = {
  modal: {
    type: null,
    visible: false,
  },
};

export const uiSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateModal: (
      state,
      action: PayloadAction<{
        type: "loginQuestionModal" | null;
        visible: boolean;
      }>
    ) => {
      state.modal = action.payload;
    },
  },
});

export const { updateModal } = uiSlice.actions;

export default uiSlice.reducer;
