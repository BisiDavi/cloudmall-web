/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type categoryState = {
  search: string;
};

const initialState: categoryState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { updateSearch } = searchSlice.actions;

export default searchSlice.reducer;
