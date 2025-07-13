import { useEffect, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckout } from "../features/checkout/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { fetchAddresses } from "../features/address/addressSlice";
import { createOrder } from "../features/order/orderSlice";
export default function Checkout() {
  const checkoutData = JSON.parse(sessionStorage.getItem("checkoutData"));
  const { items, subtotal, finalAmount, discountAmount } = useSelector(
    (state) => state.checkout
  );
  const {loading} = useSelector((state) => state.order);
  const [formData, setFormData] = useState({
    address: "",
    code: "",
    paymentMethod: "COD",
  });

const handleOrder = async () => {
  try {
    await dispatch(
      createOrder({
        fromCart: checkoutData.fromCart,
        productId: checkoutData.productId,
        color: checkoutData.color,
        size: checkoutData.size,
        quantity: checkoutData.quantity,
        shippingAddress: formData.address,
        paymentMethod: formData.paymentMethod,
        voucherCode: formData.code,
        totalAmount: finalAmount,
      })
    ).unwrap(); 

    navigate("/order-success");
  } catch (error) {
    console.error("Order failed:", error);
  }
};

  useEffect(() => {
    dispatch(fetchCheckout({ ...checkoutData, voucherCode: formData.code }));
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddresses());
  }, []);
  const { addresses } = useSelector((state) => state.address);
  const handleApplyDiscount = () => {
    dispatch(fetchCheckout({ ...checkoutData, voucherCode: formData.code }));
  };
  const navigate = useNavigate();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <Typography variant="h4" className="font-bold mb-4">
                  ToanFashion
                </Typography>
                {/* Shipping Information */}
                <Typography variant="h6" className="font-semibold">
                  Địa chỉ giao hàng
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.address}
                    label="Age"
                    required
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  >
                    {addresses.map((address) => (
                      <MenuItem value={address}>
                        <div key={address._id} className="bg-white w-full p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-base font-medium text-gray-800">
                                {address.fullName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.phone}
                              </p>
                            </div>
                          </div>

                          <div className="text-sm text-gray-700 space-y-1 mt-2">
                            <p>
                              <span className="font-semibold">Địa chỉ:</span>
                              {address.street}, {address.ward},{" "}
                              {address.district}, {address.city}
                            </p>
                            {address.note && (
                              <p>
                                <span className="font-semibold">Ghi chú:</span>{" "}
                                {address.note}
                              </p>
                            )}
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Payment Method */}
                <Typography variant="h6" className="font-semibold mb-3">
                  Phương thức thanh toán
                </Typography>
                <RadioGroup
                  value={formData.paymentMethod}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                  className="space-y-3"
                >
                  <Paper className="p-4">
                    <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-2">
                          <LocalShippingIcon sx={{ fontSize: 20 }} />
                          <span>Thanh toán khi giao hàng (COD)</span>
                        </div>
                      }
                    />
                  </Paper>
                  <Paper className="p-4">
                    <FormControlLabel
                      value="transfer"
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-2">
                          <BusinessIcon sx={{ fontSize: 20 }} />
                          <span>Chuyển khoản qua ngân hàng</span>
                        </div>
                      }
                    />
                  </Paper>
                  <Paper className="p-4">
                    <FormControlLabel
                      value="momo"
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-pink-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              M
                            </span>
                          </div>
                          <span>Ví MoMo</span>
                        </div>
                      }
                    />
                  </Paper>
                  <Paper className="p-4">
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <div className="flex items-center gap-2">
                          <CreditCardIcon sx={{ fontSize: 20 }} />
                          <span>Thẻ ATM/Visa/Master/JCB qua cổng VNPAY</span>
                        </div>
                      }
                    />
                  </Paper>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm sticky top-8">
              <CardContent className="p-6">
                {/* Product Items */}
                {items && items.length > 0 ? (
                  items.map((item, idx) => (
                    <div
                      className="flex gap-4 mb-4"
                      key={item.productId + item.size + item.color}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 bg-gray-200 rounded  flex items-center justify-center overflow-hidden">
                          <img
                            src={item.image?.url}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <Typography variant="body2" className="font-medium">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.color} - {item.size}
                        </Typography>
                      </div>
                      <Typography variant="body2" className="font-semibold">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </Typography>
                    </div>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Giỏ hàng trống
                  </Typography>
                )}

                {/* Discount Code */}
                <div className="flex gap-2 mb-4 w-full items-stretch">
                  <TextField
                    placeholder="Mã giảm giá"
                    variant="outlined"
                    size="small"
                    className="flex-1"
                    value={formData.code}
                    onChange={(e) => handleInputChange("code", e.target.value)}
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    color="error"
                    variant="contained"
                    className="h-full px-4 font-semibold"
                    style={{ minWidth: 80 }}
                  >
                    Sử dụng
                  </Button>
                </div>

                <Divider className="my-4" />

                {/* Order Summary */}
                <div className="flex justify-between py-2">
                  <Typography variant="body2">Tạm tính</Typography>
                  <Typography variant="body2">
                    {subtotal?.toLocaleString("vi-VN") || 0}₫
                  </Typography>
                </div>
                <div className="flex justify-between py-2">
                  <Typography variant="body2">Giảm giá</Typography>
                  <Typography variant="body2" color="error">
                    -{discountAmount?.toLocaleString("vi-VN") || 0}₫
                  </Typography>
                </div>

                <Divider className="my-4" />

                <div className="flex justify-between items-center">
                  <Typography variant="h6" className="font-semibold">
                    Tổng cộng
                  </Typography>
                  <div className="text-right">
                    <Typography variant="body2" color="text.secondary">
                      VND
                    </Typography>
                    <Typography variant="h6" className="font-bold">
                      {finalAmount?.toLocaleString("vi-VN") || 0}₫
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outlined"
              color="error"
            >
              Hủy
            </Button>
            <Button
              onClick={handleOrder}
              variant="contained"
              color="error"
              className="px-8"
              loading={loading}
            >
              Hoàn tất đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
