import React, { useEffect } from "react";
import { useSelector } from "react-redux";
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
const AccountContent = () => {
  const {profile} = useSelector((state) => state.user);
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Thông Tin Tài Khoản
      </h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="mb-2">
          <strong>Tên:</strong> {profile?.username}
        </p>
        <p>
          <strong>Email:</strong> {profile?.email}
        </p>
      </div>
    </div>
  );
};

export default AccountContent;
