import { useEffect } from "react";
import "aos/dist/aos.css";

import Product_item from "./Product_item";
import {
  fetchWish,
  addToWish,
  removeFromWish,
} from "../features/wish/wishSlice";
import { useDispatch, useSelector } from "react-redux";
const WishlistContent = () => {
  const dispatch = useDispatch();
  const handleAddToWish = (id) => {
    dispatch(addToWish({ productId: id }));
  };
  const handleRemoveFromWish = (id) => {
    dispatch(removeFromWish(id));
  };
  useEffect(() => {
    dispatch(fetchWish());
  }, [dispatch]);
  const { wish } = useSelector((state) => state.wish);
  const product = wish?.products;
  return (
    <div className="w-screen md:w-full px-6" data-aos="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-[#c4123f]">
        Danh Sách Yêu Thích
      </h2>

      <div className="flex-1 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {product?.map((product, index) => (
            <Product_item
              product={product}
              handleAddToWish={handleAddToWish}
              handleRemoveFromWish={handleRemoveFromWish}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistContent;
