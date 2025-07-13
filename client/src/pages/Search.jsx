import React, { useEffect } from "react";
import RootLayout from "../layout/RootLayout";
import AOS from "aos";
import Product_item from "../components/Product_item";
import { fetchProducts } from "../features/product/productSlice";
const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  useEffect(() => {
    dispatch(fetchProducts({ search: q }));
  }, [q]);
  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);
  return (
    <RootLayout>
      <div className=" mx-auto px-4 md:px-40 py-8">
        <Search_Header q={q} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {products.map((product, index) => (
            <Product_item product={product} key={index} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
};

export default Search;

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
const Search_Header = ({ q }) => {
  const { products } = useSelector((state) => state.product);
  return (
    <div
      className="mb-8 text-center"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <h1 className="text-4xl font-bold text-red-600 mb-2">Tim kiếm</h1>
      <p className="text-gray-600 mb-6">
        Có <span className="font-medium">{products.length}</span> sản phẩm cho
        tìm kiếm
      </p>
      <div className="border-b-2 border-gray-200 w-32 mx-auto mt-6"></div>

      <p className="mt-6 text-left">{q && `Kết quả tìm kiếm cho "${q}"`}</p>
    </div>
  );
};
