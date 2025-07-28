import {
  LocalShipping,
  Payment,
  Receipt,
  Print,
  Download,
  ArrowBack,
  Person,
} from "@mui/icons-material";

// Mock data based on your schema

const getStatusColor = (status, type) => {
  if (type === "payment") {
    return status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  } else {
    switch (status) {
      case "processing":
        return "warning";
      case "shipped":
        return "info";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  }
};

const getPaymentMethodIcon = (method) => {
  switch (method) {
    case "PayPal":
      return "💳";
    case "VNPAY":
      return "🏦";
    case "COD":
      return "💵";
    default:
      return "💳";
  }
};

import {
  fetchOrderById,
  updateOrderStatus,
} from "../../features/order/orderSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
export default function OrderDetail() {
  const dispatch = useDispatch();
  const DELIVERY_STATUS_OPTIONS = [
    "processing",
    "shipping",
    "delivered",
    "cancelled",
  ];
  const { id } = useParams();
  const { order } = useSelector((state) => state.order);

  const onChangeStatus = (status) => {
    dispatch(updateOrderStatus({ id, status }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            className="flex items-center gap-2 mb-4 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowBack className="w-5 h-5" />
            Quay lại danh sách đơn hàng
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đơn hàng #{order?._id}
              </h1>
              <p className="text-gray-600">
                Đặt ngày {formatDate(order?.createdAt)}
              </p>
            </div>

            <div className="flex gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Print className="w-4 h-4" />
                In hóa đơn
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-7">
            {/* Order Status */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 ">
                <div className="flex items-center gap-2">
                  <Receipt className="text-blue-600 w-5 h-5" />
                  <h2 className="text-lg font-semibold">Trạng thái đơn hàng</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Trạng thái thanh toán</p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order?.paymentStatus,
                        "payment"
                      )}`}
                    >
                      {order?.paymentStatus === "paid"
                        ? "Đã thanh toán"
                        : order?.paymentStatus === "pending" || order?.paymentStatus === "unpaid"
                        ? "Chưa thanh toán"
                        : order?.paymentStatus}
                    </span>
                  </div>
                  <Box
                    textAlign="center"
                    p={2}
                    bgcolor="#f9fafb"
                    borderRadius={2}
                  >
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      Trạng thái giao hàng
                    </Typography>

                    <FormControl size="small" fullWidth>
                      <InputLabel id="delivery-status-label">Trạng thái</InputLabel>
                      <Select
                        labelId="delivery-status-label"
                        value={order?.deliveryStatus || ""}
                        label="Trạng thái"
                        onChange={(e) => onChangeStatus(e.target.value)}
                      >
                        {DELIVERY_STATUS_OPTIONS.map((status) => (
                          <MenuItem key={status} value={status}>
                            <Chip
                              label={
                                status === "processing"
                                  ? "Đang xử lý"
                                  : status === "shipping"
                                  ? "Đang giao"
                                  : status === "delivered"
                                  ? "Đã giao"
                                  : status === "cancelled"
                                  ? "Đã hủy"
                                  : status
                              }
                              color={getStatusColor(status)}
                              size="small"
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 ">
                <h2 className="text-lg font-semibold">
                  Sản phẩm ({order?.items.length})
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 ">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                        Đơn giá
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.items.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <div className="flex gap-2 mt-1">
                                {item.color && (
                                  <span className="inline-flex px-2 py-1 text-xs border border-gray-300 rounded">
                                    {item.color}
                                  </span>
                                )}
                                {item.size && (
                                  <span className="inline-flex px-2 py-1 text-xs border border-gray-300 rounded">
                                    Size: {item.size}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-900">{item.quantity}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-900">
                            {formatPrice(item.price)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm  mb-6">
              <div className="px-6 py-4 border-b border-gray-200  ">
                <h2 className="text-lg font-semibold">Tóm tắt đơn hàng</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order?.voucher && (
                    <div className="flex justify-between py-2 text-green-600">
                      <span>Giảm giá ({order?.voucher.code})</span>
                    </div>
                  )}

                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Phí vận chuyển</span>
                    <span className="text-gray-900">Miễn phí</span>
                  </div>
                  <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg">
                    <span className="text-lg font-bold text-blue-900">
                      Tổng cộng
                    </span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatPrice(order?.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Payment className="text-blue-600 w-5 h-5" />
                  <h2 className="text-lg font-semibold">Thông tin thanh toán</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">
                      {getPaymentMethodIcon(order?.paymentMethod)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {order?.paymentMethod === "PayPal"
                        ? "PayPal"
                        : order?.paymentMethod === "VNPAY"
                        ? "VNPAY"
                        : order?.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng"
                        : order?.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Information */}
            <div className="bg-white rounded-lg shadow-sm  mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Person className="text-blue-600 w-5 h-5" />
                  <h2 className="text-lg font-semibold">Thông tin người mua</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="leading-relaxed text-gray-900">
                    <strong>{order?.userId?.username}</strong>
                    <br />
                    <a
                      href={`mailto:${order?.userId?.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {order?.userId?.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm ">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <LocalShipping className="text-blue-600 w-5 h-5" />
                  <h2 className="text-lg font-semibold">Địa chỉ giao hàng</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="leading-relaxed text-gray-900">
                    <strong>{order?.shippingAddress.fullName}</strong>
                    <br />
                    {order?.shippingAddress.street}
                    <br />
                    {order?.shippingAddress.ward},{order?.shippingAddress.state}{" "}
                    {order?.shippingAddress.city}
                    <br />
                    {"Ghi chú: "}
                    {order?.shippingAddress.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
