import React from "react";
import { useState, useEffect } from "react";
import {
  Person,
  Edit,
  Home,
  ShoppingBag,
  Favorite,
  Logout,
  KeyboardArrowDown,
  Close,
} from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
const userData = {
  name: "Sofia Havertz",
  profileImage:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pQA9QF12Re3qvPSQLP1R5cCl4osfSy.png",
  orders: [
    {
      id: "#sdvedw23f3tg34b4g433g",
      date: "17/10/2023",
      status: "Đã giao hàng",
      price: "1.234.000₫",
      shippingMethod: "COD",
    },
    {
      id: "#3456_980",
      date: "11/10/2023",
      status: "Đã giao hàng",
      price: "345.000₫",
      shippingMethod: "COD",
    },
    {
      id: "#3456_120",
      date: "24/08/2023",
      status: "Đã giao hàng",
      price: "2.345.000₫",
      shippingMethod: "COD",
    },
    {
      id: "#3456_030",
      date: "12/08/2023",
      status: "Đã giao hàng",
      price: "845.000₫",
      shippingMethod: "COD",
    },
  ],
};
const OrdersContent = () => {
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Lịch Sử Đơn Hàng
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3">Mã Đơn Hàng</th>
              <th className="pb-3 text-center">Ngày Đặt</th>
              <th className="pb-3 text-center">Tổng tiền</th>
              <th className="pb-3 text-center">Phương Thức</th>
              <th className="pb-3 text-end">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {userData.orders.map((order, index) => (
              <OrderItem key={index} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersContent;

const OrderItem = ({ order }) => {
  return (
    <tr className="border-t">
      <td className="py-4 text-blue-500">{order.id}</td>
      <td className="py-4 text-center">{order.date}</td>
      <td className="py-4 text-center">{order.price}</td>
      <td className="py-4 text-center">{order.shippingMethod}</td>
      <td className="py-4 text-end">{order.status}</td>
    </tr>
  );
};
