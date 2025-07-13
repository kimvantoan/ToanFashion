import { Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Dashboard from "./pages/Dashboard"
import Category from "./pages/Category"
import Order from "./pages/order/Order"
import AddProduct from "./pages/product/AddProduct"
import Products from "./pages/product/Products"
import OrderDetail from "./pages/order/OrderDetail"
import EditProduct from "./pages/product/EditProduct"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Voucher from "./pages/voucher/Voucher"
import AddVoucher from "./pages/voucher/AddVoucher"
import EditVoucher from "./pages/voucher/EditVoucher"
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/product/:id" element={<EditProduct />} />
        <Route path="/vouchers" element={<Voucher />} />
        <Route path="/voucher/add" element={<AddVoucher />} />
        <Route path="/voucher/edit/:id" element={<EditVoucher />} />

      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
