import productAPI from "./productAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewProducts = createAsyncThunk(
  "product/fetchNewProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productAPI.getNewProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductBySlug = createAsyncThunk(
  "product/fetchProductBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await productAPI.getBySlug(slug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (categorySlug, { rejectWithValue }) => {
    try {
      const response = await productAPI.getByCategory(categorySlug);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchProductBySlug.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductBySlug.fulfilled, (state, action) => {
          state.loading = false;
          state.product = action.payload;
        })
        .addCase(fetchProductBySlug.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchProductsByCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchProductsByCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchNewProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchNewProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchNewProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default productSlice.reducer;