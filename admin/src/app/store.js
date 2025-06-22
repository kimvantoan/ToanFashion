import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice'; // Assuming you have a productSlice defined
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer, // Assuming you have a productReducer defined
  },
});

export default store;