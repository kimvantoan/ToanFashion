import chartAPI from "./chartAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchMonthlyRevenue = createAsyncThunk(
  "chart/fetchMonthlyRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chartAPI.getMonthlyRevenue();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderStatusStats = createAsyncThunk(
  "chart/fetchOrderStatusStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chartAPI.getOrderStatusStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDailyOrderStats = createAsyncThunk(
  "chart/fetchDailyOrderStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chartAPI.getDailyOrderStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductCategoryRatio = createAsyncThunk(
  "chart/fetchProductCategoryRatio",
  async (_, { rejectWithValue }) => {
    try {
      const response = await chartAPI.getProductCategoryRatio();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const chartSlice = createSlice({
  name: "chart",
  initialState: {
    monthlyRevenue: [],
    orderStatusStats: [],
    productCategoryRatio: [],
    dailyOrderStats: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyRevenue = action.payload;
      })
      .addCase(fetchMonthlyRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderStatusStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderStatusStats.fulfilled, (state, action) => {
        state.loading = false;
        state.orderStatusStats = action.payload;
      })
      .addCase(fetchOrderStatusStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDailyOrderStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyOrderStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyOrderStats = action.payload;
      })
      .addCase(fetchDailyOrderStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductCategoryRatio.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductCategoryRatio.fulfilled, (state, action) => {
        state.loading = false;
        state.productCategoryRatio = action.payload;
      })
      .addCase(fetchProductCategoryRatio.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
  },
});

export default chartSlice.reducer;
