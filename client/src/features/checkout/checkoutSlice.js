import checkoutAPI from "./checkoutAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCheckout = createAsyncThunk(
  "checkout/fetchCheckout",
  async (data, { rejectWithValue }) => {
      try {
          const response = await checkoutAPI.get(data);
          return response.data;
      } catch (error) {
          return rejectWithValue(error.response.data);
      }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    items: [],
    subtotal: 0,
    finalAmount: 0,
    discountAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.finalAmount = action.payload.finalAmount;
        state.discountAmount = action.payload.discountAmount;
      })
      .addCase(fetchCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch checkout data";
      });
  },
});

export default checkoutSlice.reducer;