import voucherAPI from "./voucherAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

export const fetchVoucherById = createAsyncThunk(
  "voucher/fetchVoucherById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await voucherAPI.getDetail(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createVoucher = createAsyncThunk(
  "voucher/createVoucher",
  async (data, { rejectWithValue }) => {
    try {
      const response = await voucherAPI.create(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVoucher = createAsyncThunk(
  "voucher/updateVoucher",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await voucherAPI.update(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async (id, { rejectWithValue }) => {
    try {
      const response = await voucherAPI.delete(id);
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
    voucher: null,
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
      })
      .addCase(fetchVoucherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVoucherById.fulfilled, (state, action) => {
        state.loading = false;
        state.voucher = action.payload;
      })
      .addCase(fetchVoucherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers.push(action.payload);
      })
      .addCase(createVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVoucher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.vouchers.findIndex(
          (voucher) => voucher.id === action.payload.id
        );
        if (index !== -1) {
          state.vouchers[index] = action.payload;
        }
      })
      .addCase(updateVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVoucher.fulfilled, (state, action) => {
        state.loading = false;
        state.vouchers = state.vouchers.filter(
          (voucher) => voucher._id !== action.meta.arg
        );
      })
      .addCase(deleteVoucher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default voucherSlice.reducer;
