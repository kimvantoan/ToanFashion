const Home = () => {
  return (
    <div className="flex flex-col">
      <Slider />
      <CategoryGrid />
      <NewArival />
      <FeatureSection />
    </div>
  );
};

export default Home;

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slide1 from "../assets/slide1.jpg";
import slide2 from "../assets/silde2.jpg";
import slide3 from "../assets/slide3.jpg";
import slide4 from "../assets/slide4.jpg";
import slide5 from "../assets/slide5.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
const Slider = () => {
  const slides = [slide1, slide2, slide3, slide4, slide5];
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

const CategoryGrid = () => {
  const { categories } = useSelector((state) => state.category);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-2xl font-semibold mb-4 text-[#c4123f]">
        Danh mục sản phẩm
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => navigate(`/collection?category=${category.slug}`)}
            className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
          >
            <img
              src={category.image.url}
              alt={category.alt}
              className="w-full h-full object-cover aspect-[2/3] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/40 p-1 text-center">
              <h3 className="text-white text-xl font-bold tracking-wide uppercase">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { fetchProducts } from "../features/product/productSlice";
import { useEffect } from "react";
import Product_item from "../components/Product_item";
import { addToWish, removeFromWish } from "../features/wish/wishSlice";
const NewArival = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const handleAddToWish = (id) => {
    dispatch(addToWish({ productId: id }));
  };
  const handleRemoveFromWish = (id) => {
    dispatch(removeFromWish(id));
  };
  useEffect(() => {
    dispatch(fetchProducts({ limit: 10, type: "new" }));
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h2 className="text-2xl font-semibold mb-4 text-[#c4123f]">
        Sản phẩm mới
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2">
        {products.map((product) => (
          <Product_item
            product={product}
            key={product._id}
            handleAddToWish={handleAddToWish}
            handleRemoveFromWish={handleRemoveFromWish}
          />
        ))}
      </div>
    </div>
  );
};
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const FeatureSection = () => {
  const features = [
    {
      icon: Inventory2Icon,
      title: "Miễn phí vận chuyển",
      description: "Áp dụng cho mọi đơn hàng từ 500k",
    },
    {
      icon: AutorenewIcon,
      title: "Đổi hàng dễ dàng",
      description: "7 ngày đổi hàng vì bất kì lí do gì",
    },
    {
      icon: HeadsetMicIcon,
      title: "Hỗ trợ nhanh chóng",
      description: "HOTLINE 24/7 : 0964942121",
    },
    {
      icon: CreditCardIcon,
      title: "Thanh toán đa dạng",
      description: "Thanh toán khi nhận hàng, Napas, Visa, Chuyển Khoản",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 items-center justify-items-center gap-8 md:gap-4 lg:gap-8 py-8 px-4 bg-white">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center max-w-[200px]"
        >
          <feature.icon className="w-12 h-12 mb-4 text-gray-800" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {feature.title}
          </h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};
