import { configureStore } from "@reduxjs/toolkit";
import Products from "./slices/Products";
import Filters from "./slices/Filters";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    product: Products,
    filters: Filters,
    cart: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
