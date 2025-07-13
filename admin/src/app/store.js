import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice'; 
import voucherReducer from '../features/voucher/voucherSlice';
import orderReducer from '../features/order/orderSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer, 
    voucher: voucherReducer,
    order: orderReducer
  },
});

export default store;