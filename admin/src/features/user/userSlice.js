import userAPI from "./userAPI";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await userAPI.login(payload);
    return res.data;
  } catch (error) {
    const backendErrors = error.response?.data?.errors;
    console.log('Login error:', error);
    
    if (backendErrors) {
      return rejectWithValue({ fieldErrors: backendErrors });
    }
    const message = error.response?.data?.message || 'Đăng nhập thất bại';
    return rejectWithValue({ message });
  }
});

export const loginStatus = createAsyncThunk('user/loginStatus', async (_, { rejectWithValue }) => {
  try {
    const res = await userAPI.loginStatus();
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await userAPI.logout();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const res = await userAPI.getAllUsers();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userList: [],
    isAuthenticated: false,
    loading: false,
    error: null,
    fieldErrors: {},
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.fieldErrors = action.payload.fieldErrors || {};
        state.status = 'failed';
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'succeeded';
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.status = 'failed';
      })
    // Login Status
    .addCase(loginStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(loginStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = 'succeeded'; 
    })
    .addCase(loginStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || null;
      state.status = 'failed';
    })
    .addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
      state.status = 'succeeded';
    })
    .addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || null;
      state.status = 'failed';
    });
  }  
});

export default userSlice.reducer;