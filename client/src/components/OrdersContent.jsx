import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/order/orderSlice";
import formatDate from "../utils/formatDate";
import formatPrice from "../utils/Format_price";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
const OrdersContent = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Lịch Sử Đơn Hàng
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3 font-light">Mã Đơn Hàng</th>
              <th className="pb-3 text-center font-light">Ngày Đặt</th>
              <th className="pb-3 text-center font-light">Tổng tiền</th>
              <th className="pb-3 text-center font-light">Phương Thức</th>
              <th className="pb-3 text-end font-light">Vận chuyển</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order, index) => (
              <OrderItem key={index} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersContent;

import { LocalShipping, Payment, Receipt } from "@mui/icons-material";

const getStatusColor = (status, type) => {
  if (type === "payment") {
    return status === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  } else {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

const OrderItem = ({ order }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const paymentStatus = (status) => {
    if (status === "paid") {
      return "Đã thanh toán";
    } else {
      return "Chưa thanh toán";
    }
  };

  const deliveryStatus = (status) => {
    if (status === "processing") {
      return "Đang xử lý";
    } else if (status === "shipping") {
      return "Đang vận chuyển";
    } else if (status === "delivered") {
      return "Đã giao hàng";
    } else {
      return "Đã hủy";
    }
  };

  return (
    <>
      <tr
        className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        <td className="py-4">{order._id}</td>
        <td className="py-4 text-center">{formatDate(order.createdAt)}</td>
        <td className="py-4 text-center">{formatPrice(order.totalAmount)}</td>
        <td className="py-4 text-center">{order.paymentMethod}</td>
        <td className={`text-center rounded-full text-sm font-medium ${getStatusColor(
                            order.deliveryStatus,
                            "delivery"
                          )}`}>{deliveryStatus(order.deliveryStatus)}</td>
      </tr>
      <div id="main-content" inert={dialogOpen ? true : undefined}>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle className="border-b border-gray-200">
            <Typography variant="h6" component="span" className="font-medium">
              Đơn hàng #{order._id}
            </Typography>
          </DialogTitle>

          <DialogContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-7">
                {/* Order Status */}
                <div className=" rounded-lg shadow mb-6">
                  <div className="px-6 pt-4 ">
                    <div className="flex items-center gap-2">
                      <Receipt className="text-blue-600 w-5 h-5" />
                      <h2 className="text-lg font-semibold">
                        Trạng thái đơn hàng
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Thanh toán</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.paymentStatus,
                            "payment"
                          )}`}
                        >
                          {paymentStatus(order.paymentStatus)}
                        </span>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Vận chuyển</p>
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.deliveryStatus,
                            "delivery"
                          )}`}
                        >
                          {deliveryStatus(order.deliveryStatus)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-sm  mb-6">
                  <div className="px-6 py-4">
                    <h2 className="text-lg font-semibold">
                      Sản phẩm ({order.items.length})
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
                            Tổng giá
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
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
                                    <span className="inline-flex px-2 py-1 text-xs border border-gray-300 rounded">
                                      {item.color}
                                    </span>
                                    <span className="inline-flex px-2 py-1 text-xs border border-gray-300 rounded">
                                      Size: {item.size}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-gray-900">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-gray-900">
                                ${formatPrice(item.price)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="font-medium text-gray-900">
                                ${formatPrice(item.price * item.quantity)}
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
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="px-6 pt-4">
                    <h2 className="text-lg font-semibold">
                      Thông tin đơn hàng
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Phí vận chuyển</span>
                        <span className="text-gray-900">FREE</span>
                      </div>
                      <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg">
                        <span className="text-lg font-bold text-blue-900">
                          Tổng tiền
                        </span>
                        <span className="text-lg font-bold text-blue-900">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                  <div className="px-6 pt-4 ">
                    <div className="flex items-center gap-2">
                      <Payment className="text-blue-600 w-5 h-5" />
                      <h2 className="text-lg font-semibold">
                        Phương thức thanh toán
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">
                          {getPaymentMethodIcon(order.paymentMethod)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="px-6 pt-4 ">
                    <div className="flex items-center gap-2">
                      <LocalShipping className="text-blue-600 w-5 h-5" />
                      <h2 className="text-lg font-semibold">Địa chỉ</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="leading-relaxed text-gray-900">
                        <strong>{order.shippingAddress.fullName}</strong>
                        <br />
                        <strong>{order.shippingAddress.phone}</strong>
                        <br />
                        {order.shippingAddress.street}
                        <br />
                        {order.shippingAddress.ward}
                        {", "}
                        {order.shippingAddress.district}
                        {", "}
                        {order.shippingAddress.city}
                        <br />
                        {"Ghi chú: "}
                        {order.shippingAddress.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-4 border-t border-gray-200">
            <Button onClick={handleCloseDialog} className="text-gray-600">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
