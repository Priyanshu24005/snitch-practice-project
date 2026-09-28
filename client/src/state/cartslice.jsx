import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi, getCartApi } from "../api/cart.api";

// Backend ke error se readable message nikalne ke liye
const getErrorMessage = (error, fallback) => {
  const data = error.response?.data;
  // express-validator errors: { message, errors: [{ msg }] }
  if (data?.errors?.length > 0) return data.errors[0].msg;
  return data?.message || fallback;
};

// GET /cart -> { message, data: { cart } }
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCartApi();
      return res.data.data.cart;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Cart load nahi hua"));
    }
  }
);

// POST /cart phir cart dobara fetch (POST ka response shape pata nahi hai)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      await addToCartApi(data);
      const res = await getCartApi();
      return res.data.data.cart;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Cart mein add nahi hua"));
    }
  }
);

const initialState = {
  cart: null, // { user, _id, products: [] }
  isLoading: false,
  isAdding: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isAdding = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isAdding = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;