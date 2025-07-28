import React, { useEffect, useRef } from "react";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, fieldErrors,status } = useSelector((state) => state.user);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
    useEffect(() => {
      if (status === "succeeded") {
        navigate("/");
      }
    }, [status, navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 md:p-12"
        >
          <Box className="text-center mb-8">
            <Typography
              variant="h4"
              component="h1"
              className="font-bold text-gray-900 mb-4"
            >
              Đăng nhập
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography
                variant="body2"
                className="text-gray-700 font-medium mb-2"
              >
                Email
              </Typography>
              <TextField
                fullWidth
                type="email"
                required
                placeholder="Nhập địa chỉ email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                inputRef={emailRef}
                className="bg-white"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
               <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]">{fieldErrors.email}</p>
              </div>
            </div>
            

            <div>
              <Typography
                variant="body2"
                className="text-gray-700 font-medium mb-2"
              >
                Mật khẩu
              </Typography>
              <TextField
                fullWidth
                type="password"
                required
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                inputRef={passwordRef}
                className="bg-white"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#e5e7eb",
                    },
                    "&:hover fieldset": {
                      borderColor: "#d1d5db",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3b82f6",
                    },
                  },
                }}
              />
               <div className="min-h-[20px]">
                <p className="text-red-500 text-[12px]">{fieldErrors.password}</p>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-md font-medium text-base normal-case"
              sx={{
                backgroundColor: "#1e293b",
                "&:hover": {
                  backgroundColor: "#0f172a",
                },
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                padding: "12px 0",
              }}
              loading={loading}
            >
              Đăng nhập
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
