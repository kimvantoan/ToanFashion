import React from "react";
import { useState, useEffect } from "react";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import {
  Add,
  Remove,
  ShoppingCart,
  Share,
  VerifiedUser,
  LocalShipping,
  Phone,
  ArrowBackIos,
  ArrowForwardIos,
  Info,
} from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import RootLayout from "../layout/RootLayout";
import Product_item from "../components/Product_item";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Đỏ");
  const [selectedSize, setSelectedSize] = useState("M");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const productImages = [
    "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
    "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
    "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
    "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
    "https://th.bing.com/th/id/OIP.zBEtFIylVSRsAajflAkj-QHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3",
  ];

  const colorOptions = [
    { name: "Cam", color: "bg-orange-400" },
    { name: "Đỏ", color: "bg-red-600" },
    { name: "Vàng", color: "bg-yellow-400" },
    { name: "Đỏ đậm", color: "bg-red-800" },
    { name: "Xanh dương", color: "bg-blue-500" },
  ];

  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleNextImage = () => {
    setCurrentImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  return (
    <RootLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2 bg-white max-w-7xl mx-auto">
          <span>Trang chủ</span>
          <span>/</span>
          <span>Hàng mới về</span>
          <span>/</span>
          <span className="text-gray-700">
            Đệm Ngồi Ghế Thư Giãn 100% Cotton NELLY
          </span>
        </div>

        {/* Main Product Section - Desktop: Side by side, Mobile: Stacked */}
        <div className={`max-w-7xl mx-auto ${isDesktop ? "flex gap-8" : ""}`}>
          {/* Product Images */}
          <div
            className={`relative bg-white ${isDesktop ? "w-1/2" : "w-full"}`}
            data-aos="fade-up"
          >
            <div className="absolute top-2 left-2 z-10">
              <div className="bg-red-600 text-white px-3 py-1 rounded-sm text-sm font-bold">
                -60%
                <br />
                OFF
              </div>
            </div>

            <div
              className={`relative ${
                isDesktop ? "h-[500px]" : "h-80 md:h-96"
              } overflow-hidden`}
            >
              <img
                src={productImages[currentImage] || "/placeholder.svg"}
                alt="Product"
                className="object-contain"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
              >
                <ArrowBackIos fontSize="small" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-1"
              >
                <ArrowForwardIos fontSize="small" />
              </button>
            </div>

            {/* Thumbnails */}
            <div
              className={`md:flex ${
                isDesktop ? "justify-center" : "overflow-x-auto"
              } gap-2 p-2 bg-white hidden`}
            >
              {productImages.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`${
                    isDesktop ? "w-20 h-20" : "h-16"
                  } border-2 cursor-pointer ${
                    currentImage === index
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Product Specs - Desktop Only */}
            {isDesktop && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Info fontSize="small" className="text-red-600" />
                  <h3 className="font-semibold">Thông số sản phẩm</h3>
                </div>
                <div className="text-sm">
                  <p className="mb-1">NELLY Đệm ngồi ghế thư giãn</p>
                  <p className="mb-1">100% Cotton Màu đỏ</p>
                  <p className="mb-1">L40xW40xT3 • 400g Chứa dây polyester</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div
            className={`bg-white p-4 ${
              isDesktop ? "w-1/2 mt-0" : "w-full mt-2"
            }`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1
                  className={`${
                    isDesktop ? "text-3xl" : "text-2xl"
                  } font-bold text-red-600`}
                >
                  Đệm Ngồi Ghế Thư Giãn 100% Cotton NELLY
                </h1>
                <div className="flex gap-4 mt-2 text-sm">
                  <div>
                    Mã sản phẩm: <span className="font-semibold">2001412</span>
                  </div>
                  <div>
                    Tình trạng:{" "}
                    <span className="text-red-500 font-semibold">Còn hàng</span>
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  Thương hiệu:{" "}
                  <span className="font-semibold text-red-600">NELLY</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 flex items-center gap-2">
              <div className="text-sm">Giá:</div>
              <div
                className={`${
                  isDesktop ? "text-3xl" : "text-2xl"
                } font-bold text-red-600`}
              >
                99,600₫
              </div>
              <div className="text-gray-500 line-through text-sm">249,000₫</div>
              <div className="bg-red-600 text-white px-2 py-0.5 text-xs rounded">
                -60%
              </div>
            </div>

            {/* Color Selection */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <div className="text-sm min-w-16">Màu sắc:</div>
                <div className="text-blue-500 text-sm">{selectedColor}</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`relative px-4 py-2 border rounded-md ${
                      selectedColor === color.name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedColor === color.name && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <div className="text-sm min-w-16">Kích thước:</div>
                <div className="text-blue-500 text-sm">{selectedSize}</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedSize === size && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6 flex items-center">
              <div className="text-sm min-w-16">Số lượng:</div>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={handleDecrement}
                  className="px-3 py-1 text-gray-500"
                >
                  <Remove fontSize="small" />
                </button>
                <div className="px-3 py-1 min-w-8 text-center">{quantity}</div>
                <button
                  onClick={handleIncrement}
                  className="px-3 py-1 text-gray-500"
                >
                  <Add fontSize="small" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`mt-6 ${
                isDesktop ? "flex gap-4" : "grid grid-cols-2 gap-3"
              }`}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Button
                variant="outlined"
                color="error"
                className={`py-3 ${isDesktop ? "w-1/2" : "w-full"}`}
                startIcon={<ShoppingCart />}
              >
                THÊM VÀO GIỎ
              </Button>
              <Button
                variant="contained"
                color="error"
                className={`py-3 ${isDesktop ? "w-1/2" : "w-full"}`}
              >
                MUA NGAY
              </Button>
            </div>

            {/* Benefits */}
            <div
              className="mt-6 grid grid-cols-1 gap-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-3">
                <VerifiedUser className="text-red-600" />
                <div>
                  <div className="font-medium">1 Năm Bảo Hành</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LocalShipping className="text-red-600" />
                <div>
                  <div className="font-medium">
                    Hỗ trợ đổi trong 3 ngày cho sản phẩm nguyên giá
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-red-600" />
                <div>
                  <div className="font-medium">
                    Hotline: 1900 63 64 76(9-21h)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vouchers - Desktop: Full width below product */}
        {/* <div
          className="bg-white mt-2 p-4 max-w-7xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h3 className="font-semibold mb-3 text-lg">Mã giảm giá</h3>
          <div
            className={`grid ${
              isDesktop ? "grid-cols-3" : "grid-cols-1"
            } gap-3`}
          >
            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="bg-yellow-100 p-2 rounded-md">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Voucher"
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <div className="font-medium">Giảm 200.000₫</div>
                  <div className="text-sm text-gray-500">
                    Đơn hàng từ 3 triệu
                  </div>
                  <div className="text-xs text-gray-400">HSD: 31/03/2025</div>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="text-xs"
              >
                SAO CHÉP MÃ
              </Button>
            </div>

            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="bg-yellow-100 p-2 rounded-md">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Voucher"
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <div className="font-medium">Giảm 100.000₫</div>
                  <div className="text-sm text-gray-500">
                    Đơn hàng từ 2 triệu
                  </div>
                  <div className="text-xs text-gray-400">HSD: 31/03/2025</div>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="text-xs"
              >
                SAO CHÉP MÃ
              </Button>
            </div>

            <div className="border rounded-md p-3 flex items-center justify-between">
              <div className="flex gap-3">
                <div className="bg-yellow-100 p-2 rounded-md">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Voucher"
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <div className="font-medium">Giảm 50.000₫</div>
                  <div className="text-sm text-gray-500">
                    Đơn hàng từ 1 triệu
                  </div>
                  <div className="text-xs text-gray-400">HSD: 31/03/2025</div>
                </div>
              </div>
              <Button
                variant="contained"
                color="error"
                size="small"
                className="text-xs"
              >
                SAO CHÉP MÃ
              </Button>
            </div>
          </div>
        </div> */}

        {/* Product Description - Desktop Only */}
        {isDesktop && (
          <div
            className="bg-white mt-2 p-6 max-w-7xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="mb-4">
                  Đệm ngồi ghế thư giãn NELLY được làm từ 100% cotton cao cấp,
                  mang lại cảm giác êm ái và thoải mái khi sử dụng. Với thiết kế
                  đệm vuông có các đường may chia ô đều đặn, sản phẩm không chỉ
                  đảm bảo độ êm ái mà còn tăng tính thẩm mỹ cho không gian sống
                  của bạn.
                </p>
                <p className="mb-4">
                  Đệm có kích thước 40x40x3cm, trọng lượng 400g, phù hợp với hầu
                  hết các loại ghế, từ ghế ăn, ghế làm việc đến ghế thư giãn.
                  Ruột đệm được làm từ polyester cao cấp, đảm bảo độ đàn hồi tốt
                  và không bị xẹp sau thời gian dài sử dụng.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  Với nhiều màu sắc để lựa chọn, bạn có thể dễ dàng phối hợp với
                  nội thất và không gian sống của mình. Sản phẩm có thể giặt máy
                  ở nhiệt độ thấp, giúp việc vệ sinh trở nên dễ dàng hơn.
                </p>
                <p className="mb-4">
                  Đệm ngồi NELLY không chỉ là một sản phẩm tiện ích mà còn là
                  một phụ kiện trang trí nội thất, giúp không gian sống của bạn
                  trở nên ấm cúng và sang trọng hơn.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Related Products - Desktop Only */}
        <div
          className="bg-white mt-2 p-6 max-w-7xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="550"
        >
          <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {products.map((product, index) => (
              <Product_item product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProductDetails;
