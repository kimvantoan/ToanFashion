import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import voucherReducer from "../features/voucher/voucherSlice";
import wishReducer from "../features/wish/wishSlice";
import addressReducer from "../features/address/addressSlice";
import orderReducer from "../features/order/orderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    voucher: voucherReducer,
    wish: wishReducer,
    address: addressReducer,
    order: orderReducer
  },
});

export default store;
