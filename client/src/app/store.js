import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import voucherReducer from "../features/voucher/voucherSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    voucher: voucherReducer,
  },
});

export default store;
