import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type cartType = {
  cart: any[];
};

const initialState: cartType = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ name: string; price: number; image: string }>
    ) => {
      state.cart = [...state.cart, action.payload];
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
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ type: "inc" | "dec"; cartItemID: string }>
    ) => {
      if (action.payload.type === "inc") {
        const cartItem = state.cart.filter(
          (cartItem) => cartItem.name === action.payload.cartItemID
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
