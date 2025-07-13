import wishAPI from "./wishAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWish = createAsyncThunk(
  "wish/fetchWish",
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishAPI.get();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWish = createAsyncThunk(
  "wish/addToWish",
  async (data, { rejectWithValue }) => {
    try {
      const response = await wishAPI.post(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromWish = createAsyncThunk(
  "wish/removeFromWish",
  async (id, { rejectWithValue }) => {
    try {
      const response = await wishAPI.delete(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wishSlice = createSlice({
  name: "wish",
  initialState: {
    wish: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWish.fulfilled, (state, action) => {
        state.loading = false;
        state.wish = action.payload;
      })
      .addCase(fetchWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWish.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.productId) {
          if (!state.wish.products.includes(action.payload.productId)) {
            state.wish.products.push(action.payload.productId);
          }
        } else {
          state.wish = action.payload.wish;
        }
      })
      .addCase(addToWish.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(removeFromWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWish.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg) {
          state.wish.products = state.wish.products.filter(
            (product) => product._id !== action.meta.arg
          );
        }
      })
      .addCase(removeFromWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishSlice.reducer;
