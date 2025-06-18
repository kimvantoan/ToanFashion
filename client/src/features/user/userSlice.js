import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from "./userAPI";

// Async thunks
export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    const res = await userAPI.login(payload);
    return res.data;
  } catch (error) {
    const backendErrors = error.response?.data?.errors;
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

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
  try {
    const res = await userAPI.register(payload);
    return res.data;
  } catch (error) {
     const backendErrors = error.response?.data?.errors;
     console.log('Register error:', error);
     
      if (backendErrors) {
        return rejectWithValue({ fieldErrors: backendErrors });
      }
      const message = error.response?.data?.message || 'Đăng ký thất bại';
      return rejectWithValue({ message });
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

export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await userAPI.getProfile();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const res = await userAPI.updateProfile(payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    loading: false,
    fieldErrors: {},
    status: '',
  },
  reducers: {
    clearUserState: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
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
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.fieldErrors = action.payload.fieldErrors || {};
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
        state.status = 'succeeded'; 
      })
      .addCase(loginStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.status = 'failed';  
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.fieldErrors = {};

      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.fieldErrors = action.payload.fieldErrors || {};
        state.status = 'failed';
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
        })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || null;
        state.status = 'failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = '';
        state.error = null;
        state.loading = false;
      })
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;