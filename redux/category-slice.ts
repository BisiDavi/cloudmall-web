/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type categoryState = {
  storeCategory: string[];
  productCategory: string[];
};

const initialState: categoryState = {
  storeCategory: [],
  productCategory: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateStoreCategory: (state, action: PayloadAction<string>) => {
      if (!state.storeCategory.includes(action.payload)) {
        state.storeCategory = [...state.storeCategory, action.payload];
    } else {
        const categoryIndex = state.storeCategory.indexOf(action.payload);
        state.storeCategory.splice(categoryIndex, 1);
      }
    },
    updateProductCategory: (state, action: PayloadAction<string>) => {
      if (!state.productCategory.includes(action.payload)) {
        state.productCategory = [...state.productCategory, action.payload];
      } else {
        const categoryIndex = state.productCategory.indexOf(action.payload);
        state.productCategory.splice(categoryIndex, 1);
      }
    },
  },
});

export const { updateStoreCategory, updateProductCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
