/* eslint-disable no-param-reassign */
import { formattedCartType } from "@/types/cart-type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type cartType = {
  cart: formattedCartType[];
};

const initialState: cartType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<formattedCartType>) => {
      state.cart = [action.payload];
    },
    removeFromCart: (state, action: PayloadAction<any>) => {
      const selectedCartitem = state.cart.filter(
        (cartItem) => cartItem === action.payload
      );
      const tempCart = state.cart;
      if (selectedCartitem) {
        const selectedCartitemIndex = state.cart.indexOf(selectedCartitem[0]);
        state.cart = tempCart.splice(selectedCartitemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
