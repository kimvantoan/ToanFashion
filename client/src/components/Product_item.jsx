import React from "react";
import { Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { formatPrice } from "../utils/Format_price";
const Product_item = ({ product }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all transform hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="relative">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-40 object-contain p-2"
          data-aos="zoom-in"
        />
        {product.discount > 0 && (
          <div
            className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full"
            data-aos="zoom-in"
          >
            -{product.discount}%
          </div>
        )}
        <IconButton
          className="absolute top-2 left-2 bg-white shadow-sm p-1"
          size="small"
          data-aos="zoom-in"
        >
          <Favorite
            fontSize="small"
            className="text-gray-400 hover:text-rose-500"
          />
        </IconButton>
      </div>
      <div className="p-3">
        <div className="text-gray-500 text-xs mb-1" data-aos="fade-right">
          {product.brand}
        </div>
        <h3
          className="text-sm font-medium line-clamp-2 h-10 mb-2"
          data-aos="fade-right"
        >
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2" data-aos="fade-right">
          <span className="text-rose-600 font-bold">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-gray-400 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product_item;
