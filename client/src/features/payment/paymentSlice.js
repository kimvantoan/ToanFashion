import paymentAPI from "./paymentAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createVNPAY = createAsyncThunk(
  "payment/createVNPAY", // Request action type
  async (data, { rejectWithValue }) => {
      try {
          const response = await paymentAPI.createVNPAY(data);
          return response.data; // Return the response data
      } catch (error) {
          return rejectWithValue(error.response.data); // Handle error
      }
  }
);

export const checkVNPAY = createAsyncThunk(
  "payment/checkVNPAY", // Request action type
  async (data, { rejectWithValue }) => {
      try {
          const response = await paymentAPI.checkVNPAY(data);
           console.log("🔍 Backend response:", response.data); // <--- 
          return response.data; 
      } catch (error) {
          return rejectWithValue(error.response.data); // Handle error
      }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loading: false,
    error: null,
    status: null, 
    vnpayData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createVNPAY.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVNPAY.fulfilled, (state, action) => {
        state.loading = false;
        state.vnpayData = action.payload; // Store the response data
      })
      .addCase(createVNPAY.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(checkVNPAY.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkVNPAY.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status; // Store the payment status
        state.vnpayData = action.payload; // Store the response data
      })
      .addCase(checkVNPAY.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed"; // Set status to failed
        state.error = action.payload; // Store the error message
      });
  }
});
export default paymentSlice.reducer;