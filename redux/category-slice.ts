import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type categoryState = {
  category: string[];
};

const initialState: categoryState = {
  category: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<string>) => {
      if (!state.category.includes(action.payload)) {
        state.category = [...state.category, action.payload];
      } else {
        const categoryIndex = state.category.indexOf(action.payload);
        state.category.splice(categoryIndex, 1);
      }
    },
  },
});

export const { updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
