import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import locationReducer from "@/redux/location-slice";
import cartReducer from "@/redux/cart-slice";
import uiReducer from "@/redux/ui-slice";
import categoryReducer from "@/redux/category-slice";
import searchReducer from "@/redux/search-slice";
import deliveryDetailsReducer from "@/redux/delivery-details-slice";
import loginReducer from "@/redux/login-slice";
import paymentReducer from "@/redux/payment-slice";

const reducers = combineReducers({
  location: locationReducer,
  cart: cartReducer,
  ui: uiReducer,
  category: categoryReducer,
  search: searchReducer,
  deliveryDetails: deliveryDetailsReducer,
  loginDetails: loginReducer,
  payment: paymentReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["location", "cart", "loginDetails"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
