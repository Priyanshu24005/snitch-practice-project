import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/authslice";
import productReducer from "../state/productslice";
import cartReducer from "../state/cartslice";
import sellerReducer from "../state/sellerslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    seller: sellerReducer,
  },
});

export default store;