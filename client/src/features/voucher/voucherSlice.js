import { voucherAPI } from "./voucherAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchVouchers = createAsyncThunk(
  "voucher/fetchVouchers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await voucherAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = action.payload;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default voucherSlice.reducer;
