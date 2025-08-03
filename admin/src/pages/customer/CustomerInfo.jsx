import { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";
const customerData = {
  name: "Randhir Kumar",
  location: "India",
  avatar: "R",
  rating: 5,
  orders: 5,
  customerFor: "2 years",
  address: {
    street: "Panajpur Janga",
    city: "Hajipur,vaishali",
    postalCode: "844124",
    country: "India",
  },
  email: "randhirppl@gmail.com",
  phone: "+91 9804789764",
  tags: ["Vip Customer", "Europe"],
};
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../features/user/userSlice";
import { fetchOrders } from "../../features/order/orderSlice";
import formatDate  from "../../utils/formatDate";
import {formatPrice} from "../../utils/formatPrice";
export default function CustomerDashboard() {
  const { id } = useParams();
  const getStatusBgColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipping":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(fetchOrders());
  }, [dispatch, id]);

  const { customer } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const getOrderUser = () => {
    return orders.filter((order) => order.userId._id === id);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" className="font-semibold text-gray-900">
              Thông tin khách hàng
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột trái */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hồ sơ khách hàng */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <Typography
                          variant="h6"
                          className="font-semibold text-gray-900"
                        >
                          {customer?.username}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                          {getOrderUser().length} đơn hàng
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                          Đã tham gia {customer?.createdAt ? `${Math.floor((Date.now() - new Date(customer.createdAt)) / (1000 * 60 * 60 * 24))} ngày` : ""}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Đơn hàng của khách */}
            <Card>
              <CardContent className="p-6">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-900 mb-4"
                >
                  Đơn hàng của khách
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="font-semibold text-gray-700">
                          Mã đơn
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Ngày đặt
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Trạng thái
                        </TableCell>
                        <TableCell className="font-semibold text-gray-700">
                          Giá trị
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getOrderUser().map((order, index) => (
                        <TableRow key={index} onClick={() => navigate(`/order/${order._id}`)} >
                          <TableCell className="font-medium">
                            {order._id}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {formatDate(order.createdAt)}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(
                                order.deliveryStatus
                              )}`}
                            >
                              {order.deliveryStatus === "processing"
                                ? "Đang xử lý"
                                : order.deliveryStatus === "shipping"
                                ? "Đang giao"
                                : order.deliveryStatus === "delivered"
                                ? "Đã giao"
                                : order.deliveryStatus === "cancelled"
                                ? "Đã hủy"
                                : order.deliveryStatus}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatPrice(order.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>

          {/* Cột phải */}
          <div className="space-y-6">
            {/* Tổng quan */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900"
                  >
                    Tổng quan
                  </Typography>
                </div>

                <div className="space-y-4">
                  <div>
                    <Typography variant="body2" className="text-gray-500 mb-1">
                      Email
                    </Typography>
                    <Typography variant="body2" className="text-gray-900">
                      {customer?.email}
                    </Typography>
                  </div>

                  <Button
                    variant="text"
                    color="error"
                    className="mt-4"
                    fullWidth
                  >
                    Xóa khách hàng
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
