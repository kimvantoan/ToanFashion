import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes/router";
import { useDispatch } from "react-redux";
import { loginStatus } from "./features/user/userSlice";
import { useEffect } from "react";
function App() {
    const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      dispatch(loginStatus());
    };
    checkLogin();
  }, [dispatch]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
