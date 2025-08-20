// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../components/MainLayout";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";

// Dùng lazy load cho các trang
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Category = lazy(() => import("../pages/Category"));
const Order = lazy(() => import("../pages/order/Order"));
const OrderDetail = lazy(() => import("../pages/order/OrderDetail"));
const Products = lazy(() => import("../pages/product/Products"));
const AddProduct = lazy(() => import("../pages/product/AddProduct"));
const EditProduct = lazy(() => import("../pages/product/EditProduct"));
const Voucher = lazy(() => import("../pages/voucher/Voucher"));
const AddVoucher = lazy(() => import("../pages/voucher/AddVoucher"));
const EditVoucher = lazy(() => import("../pages/voucher/EditVoucher"));
const Customer = lazy(() => import("../pages/customer/Customer"));
const CustomerInfo = lazy(() => import("../pages/customer/CustomerInfo"));
const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div className="text-center py-10">
        <CircularProgress />
      </div>
    }
  >
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(Login),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        element: <ProtectedRoute />, 
        children: [
          { path: "", element: withSuspense(Dashboard) },
          { path: "categories", element: withSuspense(Category) },
          { path: "orders", element: withSuspense(Order) },
          { path: "order/:id", element: withSuspense(OrderDetail) },
          { path: "products", element: withSuspense(Products) },
          { path: "add-product", element: withSuspense(AddProduct) },
          { path: "product/:id", element: withSuspense(EditProduct) },
          { path: "vouchers", element: withSuspense(Voucher) },
          { path: "voucher/add", element: withSuspense(AddVoucher) },
          { path: "voucher/edit/:id", element: withSuspense(EditVoucher) },
          { path: "customers", element: withSuspense(Customer) },
          { path: "customer/:id", element: withSuspense(CustomerInfo) },
        ],
      },
    ],
  },
]);

export default router;
