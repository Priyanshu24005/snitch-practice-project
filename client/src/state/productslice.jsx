import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductsApi, getProductByIdApi } from "../api/product.api";

const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllProductsApi();
      return res.data.data.products;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProductByIdApi(id);
      return res.data.data.product;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.product = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;