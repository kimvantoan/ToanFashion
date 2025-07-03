import React from "react";
import { useState, useEffect } from "react";
import { Close } from "@mui/icons-material";
import "aos/dist/aos.css";

import Product_item from "./Product_item";
import { fetchWish } from "../features/wish/wishSlice";
import { useDispatch, useSelector } from "react-redux";
const WishlistContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWish());
  },[dispatch]);
  const { wish } = useSelector((state) => state.wish);
  const product = wish?.products
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Danh Sách Yêu Thích
      </h2>

      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {product?.map((product, index) => (
            <Product_item product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistContent;

const WishItem = ({ item }) => {
  return (
    <>
      {/* wish item destop */}
      <tr className="hidden md:table-row">
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

      {/* wish item mobile */}
      <div className="p-6 shadow md:hidden" data-aos="fade-up">
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
    </>
  );
};
