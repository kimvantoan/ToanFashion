import { useEffect, useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Radio,
  RadioGroup,
  Paper,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import BusinessIcon from "@mui/icons-material/Business";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckout } from "../features/checkout/checkoutSlice";
import {  useNavigate } from "react-router-dom";
import { useJsApiLoader, Autocomplete as GoogleAutocomplete } from "@react-google-maps/api";

export default function Checkout() {
  const checkoutData =JSON.parse(sessionStorage.getItem("checkoutData"))
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { items, subtotal, finalAmount, discountAmount } = useSelector(
    (state) => state.checkout
  );
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    code: "",
  });
  useEffect(() => {
    dispatch(fetchCheckout({ ...checkoutData, voucherCode: formData.code }));
  },[])
  const dispatch = useDispatch();
  const handleApplyDiscount = (e) => {
    dispatch(fetchCheckout({ ...checkoutData, voucherCode: formData.code }));
  };
  const navigate = useNavigate();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCblpeZdl62vU9mUK7ZIqWZbp9h1n7wsTE", 
    libraries: ["places"],
  });

  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      const place = autoComplete.getPlace();
      handleInputChange("address", place.formatted_address || "");
    }
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
                <Typography variant="h6" className="font-semibold mb-3">
                  Thông tin giao hàng
                </Typography>
                <div className="flex flex-col gap-4 mb-5">
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    variant="outlined"
                    value={formData.fullName}
                    size="small"
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    variant="outlined"
                    type="tel"
                    size="small"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <Typography variant="h6" className="font-semibold mb-3">
                  Địa chỉ giao hàng
                </Typography>
                <div className="mb-5">
                  {isLoaded ? (
                    <GoogleAutocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                      options={{
                        types: ["address"],
                        componentRestrictions: { country: "vn" },
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Địa chỉ"
                        variant="outlined"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        size="small"
                      />
                    </GoogleAutocomplete>
                  ) : (
                    <TextField
                      fullWidth
                      label="Địa chỉ"
                      variant="outlined"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      size="small"
                    />
                  )}
                </div>
                {/* Payment Method */}
                <Typography variant="h6" className="font-semibold mb-3">
                  Phương thức thanh toán
                </Typography>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="space-y-3"
                >
                  <Paper className="p-4">
                    <FormControlLabel
                      value="cod"
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
              size="small"
              color="primary"
            >
              Hủy
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              className="px-8"
            >
              Hoàn tất đơn hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
