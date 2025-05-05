import React from 'react'
import { useState, useEffect } from "react"
import { Person, Edit, Home, ShoppingBag, Favorite, Logout, KeyboardArrowDown, Close } from "@mui/icons-material"
import AOS from "aos"
import "aos/dist/aos.css"
import AccountContent from "../components/AccountContent";
import AddressContent from "../components/AddressContent";
import WishlistContent from "../components/WishlistContent";
const userData = {
  name: "Sofia Havertz",
  profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pQA9QF12Re3qvPSQLP1R5cCl4osfSy.png",
  addresses: {
    billing: {
      name: "Sofia Havertz",
      phone: "+1 234 567 890",
      address: "345 Long Island, NewYork, Hoa Kỳ",
    },
    shipping: {
      name: "Sofia Havertz",
      phone: "+1 234 567 890",
      address: "345 Long Island, NewYork, Hoa Kỳ",
    },
  },
  orders: [
    { id: "#3456_798", date: "17/10/2023", status: "Đã giao hàng", price: "1.234.000₫" },
    { id: "#3456_980", date: "11/10/2023", status: "Đã giao hàng", price: "345.000₫" },
    { id: "#3456_120", date: "24/08/2023", status: "Đã giao hàng", price: "2.345.000₫" },
    { id: "#3456_030", date: "12/08/2023", status: "Đã giao hàng", price: "845.000₫" },
  ],
  wishlist: [
    {
      id: 1,
      name: "Bàn Khay",
      color: "Đen",
      price: "19.190₫",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 2,
      name: "Sofa",
      color: "Be",
      price: "345.000₫",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 3,
      name: "Giỏ tre",
      color: "Be",
      price: "8.800₫",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 4,
      name: "Gối",
      color: "Be",
      price: "8.800₫",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
  ],
}
const OrdersContent = () => {
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
    <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">Lịch Sử Đơn Hàng</h2>

    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="pb-3">Mã Đơn Hàng</th>
            <th className="pb-3">Ngày</th>
            <th className="pb-3">Trạng Thái</th>
            <th className="pb-3">Giá</th>
          </tr>
        </thead>
        <tbody>
          {userData.orders.map((order, index) => (
            <tr key={index} className="border-t">
              <td className="py-4">{order.id}</td>
              <td className="py-4">{order.date}</td>
              <td className="py-4">{order.status}</td>
              <td className="py-4">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default OrdersContent