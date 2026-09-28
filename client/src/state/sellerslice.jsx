import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSellerProductsApi,
  createProductApi,
  listProductApi,
  unlistProductApi,
} from "../api/seller.api";

const getErrorMessage = (error, fallback) => {
  const data = error.response?.data;
  if (data?.errors?.length > 0) return data.errors[0].msg;
  return data?.message || fallback;
};

// GET /products/sellerProducts -> { message, data: { products } }
export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchSellerProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getSellerProductsApi();
      return res.data.data.products;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Products load nahi hue"));
    }
  }
);

// POST /products (multipart)
export const createProduct = createAsyncThunk(
  "seller/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      await createProductApi(formData);
      return true;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Product create nahi hua"));
    }
  }
);

// PATCH /products/list/:id ya /unlist/:id
export const changeListing = createAsyncThunk(
  "seller/changeListing",
  async ({ id, publish }, { rejectWithValue }) => {
    try {
      if (publish) {
        await listProductApi(id);
      } else {
        await unlistProductApi(id);
      }
      return { id, published: publish };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Kuch galat ho gaya"));
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  isCreating: false,
  updatingId: null, // jis product ka list/unlist chal raha hai
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchSellerProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // create
      .addCase(createProduct.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isCreating = false;
      })
      // list / unlist
      .addCase(changeListing.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(changeListing.fulfilled, (state, action) => {
        state.updatingId = null;
        const product = state.products.find((p) => p._id === action.payload.id);
        if (product) product.published = action.payload.published;
      })
      .addCase(changeListing.rejected, (state) => {
        state.updatingId = null;
      });
  },
});

export default sellerSlice.reducer;