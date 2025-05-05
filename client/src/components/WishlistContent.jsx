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
import AccountContent from "../components/AccountContent";
import AddressContent from "../components/AddressContent";
import OrdersContent from "../components/OrdersContent";
const userData = {
  name: "Sofia Havertz",
  profileImage:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pQA9QF12Re3qvPSQLP1R5cCl4osfSy.png",
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
    {
      id: "#3456_798",
      date: "17/10/2023",
      status: "Đã giao hàng",
      price: "1.234.000₫",
    },
    {
      id: "#3456_980",
      date: "11/10/2023",
      status: "Đã giao hàng",
      price: "345.000₫",
    },
    {
      id: "#3456_120",
      date: "24/08/2023",
      status: "Đã giao hàng",
      price: "2.345.000₫",
    },
    {
      id: "#3456_030",
      date: "12/08/2023",
      status: "Đã giao hàng",
      price: "845.000₫",
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Bàn Khay",
      color: "Đen",
      price: "19.190₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 2,
      name: "Sofa",
      color: "Be",
      price: "345.000₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 3,
      name: "Giỏ tre",
      color: "Be",
      price: "8.800₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 4,
      name: "Gối",
      color: "Be",
      price: "8.800₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
  ],
};
const WishlistContent = () => {
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Danh Sách Yêu Thích
      </h2>

      <div className="overflow-x-auto hidden md:block border-none">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-3"></th>
              <th className="pb-3">Sản Phẩm</th>
              <th className="pb-3">Giá</th>
              <th className="pb-3">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {userData.wishlist.map((item, index) => (
              <tr key={index} >
                <td className="py-4 pr-2">
                  <button className="text-gray-400">
                    <Close />
                  </button>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 mr-3 flex-shrink-0">
                      <img
                        src={`/placeholder.svg?height=64&width=64`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Màu: {item.color}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">{item.price}</td>
                <td className="py-4">
                  <button className="bg-[#c4123f] text-white px-4 py-2 rounded-md text-sm">
                    Thêm vào giỏ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Wishlist View */}
      <div className="md:hidden space-y-6">
        {userData.wishlist.map((item, index) => (
          <div
            key={index}
            className="p-6 shadow"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <button className="text-gray-400">
              <Close />
            </button>
            <div className="flex items-center mb-3">
              <div className="w-16 h-16 bg-gray-100 mr-3 flex-shrink-0">
                <img
                  src={`/placeholder.svg?height=64&width=64`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Màu: {item.color}</p>
                <p className="font-medium mt-1">{item.price}</p>
              </div>
            </div>
            <button className="bg-[#c4123f] text-white w-full py-3 rounded-md text-sm">
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistContent;
