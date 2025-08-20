import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkVNPAY } from "../features/payment/paymentSlice";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Container,
  Stack,
  Chip,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Home,
  Receipt,
  Refresh,
} from "@mui/icons-material";

export default function PaymentReturn() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, orderId } = useSelector((state) => state.payment);
  console.log("PaymentReturn status:", status);
  useEffect(() => {
    dispatch(checkVNPAY(location.search));
  }, [dispatch, location.search]);

  const handleViewOrder = () => {
    if (orderId) {
      navigate(`/order/${orderId}`);
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleRetry = () => {
    navigate(-1);
  };

  if (status === "loading") return <div>Đang xác nhận thanh toán...</div>;
  if (status === "success") {
    return (
      <Container
        maxWidth="sm"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100"
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8">
            <Box className="text-center mb-6">
              <Box className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </Box>
              <Typography
                variant="h4"
                className="font-bold text-green-800 mb-2"
              >
                Thanh toán thành công!
              </Typography>
              <Typography variant="body1" className="text-green-700">
                Đơn hàng của bạn đã được ghi nhận và đang được xử lý
              </Typography>
            </Box>

            {orderId && (
              <Alert severity="success" className="mb-6">
                <Box>
                  <Typography variant="body2" className="font-medium mb-1">
                    Mã đơn hàng
                  </Typography>
                  <Chip
                    label={orderId}
                    variant="outlined"
                    className="font-mono font-bold"
                    color="success"
                  />
                </Box>
              </Alert>
            )}

            <Stack spacing={2}>
              <Button
                onClick={handleGoHome}
                variant="outlined"
                color="success"
                size="large"
                startIcon={<Home />}
                className="w-full py-3"
              >
                Về trang chủ
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }
  if (status === "failed") {
    return (
      <Container
        maxWidth="sm"
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100"
      >
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8">
            <Box className="text-center mb-6">
              <Box className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <Cancel className="h-12 w-12 text-red-600" />
              </Box>
              <Typography variant="h4" className="font-bold text-red-800 mb-2">
                Thanh toán thất bại!
              </Typography>
              <Typography variant="body1" className="text-red-700">
                Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
              </Typography>
            </Box>

            <Alert severity="error" className="mb-6">
              <Typography variant="body2">
                Nếu bạn đã bị trừ tiền, số tiền sẽ được hoàn lại trong vòng 3-5
                ngày làm việc.
              </Typography>
            </Alert>

            <Stack spacing={2}>
              <Button
                onClick={handleRetry}
                variant="contained"
                color="error"
                size="large"
                startIcon={<Refresh />}
                className="w-full py-3"
              >
                Thử lại thanh toán
              </Button>
              <Button
                onClick={handleGoHome}
                variant="outlined"
                color="error"
                size="large"
                startIcon={<Home />}
                className="w-full py-3"
              >
                Về trang chủ
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }
}
