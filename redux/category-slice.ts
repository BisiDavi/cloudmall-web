import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type  categoryState = {
  category: string;
};

const initialState: categoryState = {
  category: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
