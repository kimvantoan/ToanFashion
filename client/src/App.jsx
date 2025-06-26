import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound404 from "./pages/NotFound404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ListProduct from "./pages/ListProduct";
import ProductDetails from "./pages/ProductDetails";
import Account from "./pages/Account";
import Search from "./pages/Search";
import { useDispatch } from "react-redux";
import { loginStatus } from "./features/user/userSlice";
import { useEffect } from "react";
import Checkout from "./pages/Checkout";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      dispatch(loginStatus());
    };
    checkLogin();
  }, [dispatch]);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/collection" element={<ListProduct />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/account" element={<Account />} />
      <Route path="/search" element={<Search />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default App;
