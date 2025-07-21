import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout & route wrapper
import ProtectedRoute from "./ProtectedRoute";
import RootLayout from "../layout/RootLayout";

// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Cart = lazy(() => import("../pages/Cart"));
const ListProduct = lazy(() => import("../pages/ListProduct"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Account = lazy(() => import("../pages/Account"));
const Search = lazy(() => import("../pages/Search"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../components/OrderSuccess"));
const NotFound404 = lazy(() => import("../pages/NotFound404"));
import CircularProgress from "@mui/material/CircularProgress";
const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div className="text-center py-10">
        <CircularProgress />
      </div>
    }
  >
    {Component}
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: withSuspense(<NotFound404 />),
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "collection", element: withSuspense(<ListProduct />) },
      { path: "product/:slug", element: withSuspense(<ProductDetails />) },
      { path: "cart", element: withSuspense(<Cart />) },
      { path: "order-success", element: withSuspense(<OrderSuccess />) },
      {
        path: "account",
        element: <ProtectedRoute>{withSuspense(<Account />)}</ProtectedRoute>,
      },
      { path: "search", element: withSuspense(<Search />) },
      { path: "/login", element: withSuspense(<Login />) },
      { path: "/register", element: withSuspense(<Register />) },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
  {
    path: "checkout",
    element: <ProtectedRoute>{withSuspense(<Checkout />)}</ProtectedRoute>,
  },
]);

export default router;
