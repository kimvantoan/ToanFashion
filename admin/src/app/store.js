import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoryReducer from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;