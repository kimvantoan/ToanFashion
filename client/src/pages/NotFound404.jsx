import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import RootLayout from "../layout/RootLayout";

const NotFound404 = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };
  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center  px-4 py-8 bg-white">
        <h1 className="text-[200px] font-bold text-gray-300 drop-shadow-2xl tracking-wider leading-none">
          404
        </h1>
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          Không tìm thấy trang
        </h2>
        <p className="text-gray-600 text-center max-w-lg mb-8">
          Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link
          hoặc chưa bao giờ tồn tại.
        </p>
        <Button
          variant="contained"
          onClick={handleReturnHome}
          sx={{
            backgroundColor: "#c41e3a",
            "&:hover": {
              backgroundColor: "#a51a30",
            },
            borderRadius: "4px",
            padding: "10px 20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          TRỞ VỀ TRANG CHỦ
        </Button>
      </div>
    </RootLayout>
  );
};

export default NotFound404;
