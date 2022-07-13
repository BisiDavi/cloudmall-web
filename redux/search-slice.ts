/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type categoryState = {
  categorySearch: string;
  productSearch: string;
};

const initialState: categoryState = {
  categorySearch: "",
  productSearch: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateCategorySearch: (state, action: PayloadAction<string>) => {
      state.categorySearch = action.payload;
    },
    updateProductSearch: (state, action: PayloadAction<string>) => {
      state.productSearch = action.payload;
    },
  },
});

export const { updateCategorySearch, updateProductSearch } = searchSlice.actions;

export default searchSlice.reducer;
