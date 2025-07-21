import { RouterProvider } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginStatus } from "./features/user/userSlice";
import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import router from "./routes/router";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      dispatch(loginStatus());
    };
    checkLogin();
  }, [dispatch]);
  useEffect(() => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 500,
        once: true,
      });
      AOS.refresh();
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
