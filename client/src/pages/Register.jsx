import React, { useState } from "react";
import RootLayout from "../layout/RootLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/user/userSlice";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { useRef } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { fieldErrors, status,loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlechange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (fieldErrors) {
      if (fieldErrors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (fieldErrors.password && passwordRef.current) {
        passwordRef.current.focus();
      }
    }
  }, [fieldErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password, confirmPassword }));
  };
  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, navigate]);
  return (
    <RootLayout>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="flex border-b border-gray-200">
          <Link
            to={"/login"}
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors text-gray-500 hover:text-gray-700`}
          >
            Đăng nhập
          </Link>
          <button
            className={`flex-1 px-4 py-3 text-center font-medium transition-colors border-b-2 border-black text-black`}
          >
            Đăng ký
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tên người dùng"
                  className="w-full rounded bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  autoFocus
                  name="username"
                  value={username}
                  onChange={handlechange}
                />
              </div>
              <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]"></p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  className="w-full rounded bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  name="email"
                  value={email}
                  onChange={handlechange}
                />
              </div>
              <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]">{fieldErrors.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className="w-full rounded bg-gray-100 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  name="password"
                  value={password}
                  ref={passwordRef} 
                  onChange={handlechange}
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]">
                  {fieldErrors.password}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full rounded bg-gray-100 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handlechange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" x2="22" y1="2" y2="22"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
              <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]"></p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </div>
            <Button
              type="submit"
              fullWidth
              sx={{
                borderRadius: 1,
                backgroundColor: "#dc2626",
                px: 4,
                fontWeight: 500,
                color: "white",
                textTransform: "none",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
              loading={loading}
              variant="contained"
            >
              {"ĐĂNG KÝ"}
            </Button>
            <div className="mt-4 text-center text-sm">
              <span>Bạn đã có tài khoản? </span>
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </RootLayout>
  );
};

export default Register;
