import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
  },
  // middleware tự động bao gồm redux-thunk và devTools
});

export default store;
