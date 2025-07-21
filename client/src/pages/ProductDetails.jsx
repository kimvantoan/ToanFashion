import React, { useLayoutEffect, useState, useEffect } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import voucher_icon from "../assets/voucher_icon.png";
import formatDate from "../utils/formatDate";
import {
  Add,
  Remove,
  ShoppingCart,
  ArrowBackIos,
  ArrowForwardIos,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import Product_item from "../components/Product_item";
import { useNavigate, useParams } from "react-router";
import {
  fetchProductBySlug,
  fetchProductsByCategory,
} from "../features/product/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import  formatPrice  from "../utils/Format_price";
import { fetchCheckout } from "../features/checkout/checkoutSlice";
import { fetchVouchers } from "../features/voucher/voucherSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [voucherPage, setVoucherPage] = useState(0);
  const [copiedVoucher, setCopiedVoucher] = useState(null);

  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { slug } = useParams();
  const { product, products } = useSelector((state) => state.product);
  const { vouchers } = useSelector((state) => state.voucher);
  const navigate = useNavigate();

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Fetch product by slug
  useLayoutEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [slug, dispatch]);

  // Fetch vouchers
  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  // Fetch related products by category
  useLayoutEffect(() => {
    if (product?.category) {
      dispatch(fetchProductsByCategory(product.category.slug));
    }
  }, [product, dispatch]);

  // Voucher paging
  const vouchersPerPage = 2;
  const handlePrevVoucher = () => setVoucherPage((prev) => Math.max(prev - 1, 0));
  const handleNextVoucher = () =>
    setVoucherPage((prev) =>
      prev + 1 < Math.ceil(vouchers.length / vouchersPerPage) ? prev + 1 : prev
    );
  const pagedVouchers = vouchers.slice(
    voucherPage * vouchersPerPage,
    voucherPage * vouchersPerPage + vouchersPerPage
  );

  // Product images, sizes, colors
  const productImages = product?.images?.map((img) => img.url) || [];
  const allSizes = Array.from(
    new Set(product?.variants?.flatMap((v) => v.sizes.map((s) => s.size)) || [])
  );
  const colorOptions = product?.variants?.map((v) => v.color) || [];

  // Check if color-size is available
  const isColorSizeAvailable = (color, size) => {
    const variant = product?.variants?.find((v) => v.color === color);
    if (!variant) return false;
    const sizeObj = variant.sizes.find((s) => s.size === size);
    return !!sizeObj && sizeObj.stock > 0;
  };

  // Auto select size when color changes
  const selectedVariant = product?.variants?.find(
    (v) => v.color === selectedColor
  );
  useEffect(() => {
    if (selectedColor && selectedVariant?.sizes.length > 0) {
      const firstAvailable = selectedVariant.sizes.find((s) => s.stock > 0);
      setSelectedSize(
        firstAvailable ? firstAvailable.size : selectedVariant.sizes[0].size
      );
    }
    if (!selectedColor) setSelectedSize(null);
  }, [selectedColor, product]);

  // Quantity handlers
  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : q));

  // Image handlers
  const handleNextImage = () =>
    setCurrentImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  const handlePrevImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );

  // Checkout handler
  const handleCheckout = () => {
    if (!selectedColor || !selectedSize) return;
    const checkoutData = {
      fromCart: false,
      productId: product._id,
      color: selectedColor,
      size: selectedSize,
      quantity,
      voucherCode: null,
    };
    dispatch(fetchCheckout(checkoutData));
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    navigate("/checkout")
  };

  // Related products
  const similarProducts = products.filter((p) => p?._id !== product?._id);

  return (
      <div className="bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2 bg-white max-w-7xl mx-auto">
          <span>Trang chủ</span>
          <span>/</span>
          <span>Hàng mới về</span>
          <span>/</span>
          <span className="text-gray-700">{product?.name}</span>
        </div>

        {/* Main Product Section */}
        <div className={`max-w-7xl mx-auto ${isDesktop ? "flex gap-8" : ""}`}>
          {/* Product Images */}
          <div
            className={`relative bg-white ${isDesktop ? "w-1/2" : "w-full"}`}
            data-aos="fade-up"
          >
            <div
              className={`relative ${
                isDesktop ? "h-[500px]" : "h-80 md:h-96"
              } overflow-hidden`}
            >
              <img
                src={
                  productImages.length > 0
                    ? productImages[currentImage]
                    : "/placeholder.svg"
                }
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
              {productImages.length > 0 ? (
                productImages.map((img, index) => (
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
                ))
              ) : (
                <div className="w-20 h-20 border-2 border-gray-200">
                  <img
                    src="/placeholder.svg"
                    alt="No images"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          {/* Product Info */}
          <div
            className={`bg-white px-4 py-0 ${
              isDesktop ? "w-1/2 mt-0" : "w-full mt-2"
            }`}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h1
                  className={`${
                    isDesktop ? "text-3xl" : "text-lg"
                  } font-bold text-red-600`}
                >
                  {product?.name}
                </h1>
                <div className="flex gap-4 mt-2 text-sm">
                  <div>
                    Mã sản phẩm:{" "}
                    <span className="font-semibold">{product?._id}</span>
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  Thương hiệu:{" "}
                  <span className="font-semibold text-red-600">
                    {product?.brand}
                  </span>
                </div>
              </div>
            </div>
            {/* Price */}
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm">Giá:</div>
              <div
                className={`${
                  isDesktop ? "text-3xl" : "text-2xl"
                } font-bold text-red-600`}
              >
                {formatPrice(product?.discount || product?.price)}
              </div>
              <div className="text-gray-500 line-through text-sm">
                {product?.discount > 0 && formatPrice(product?.price)}
              </div>
              <div className="bg-red-600 text-white px-2 py-0.5 text-xs rounded">
                {product?.discount > 0 &&
                  `-${(
                    ((product?.price - product?.discount) / product?.price) *
                    100
                  ).toFixed(0)}%`}
              </div>
            </div>
            {/* Color Selection */}
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="text-sm min-w-16">Màu sắc:</div>
                <div className="text-blue-500 text-sm">
                  {selectedColor || (
                    <span className="text-gray-400">Chọn màu</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorOptions.map((color) => {
                  const variant = product?.variants?.find(
                    (v) => v.color === color
                  );
                  const hasStock = variant?.sizes?.some((s) => s.stock > 0);
                  const disabled = !hasStock;
                  return (
                    <button
                      key={color}
                      onClick={() =>
                        !disabled &&
                        setSelectedColor(selectedColor === color ? null : color)
                      }
                      disabled={disabled}
                      className={`relative px-2 py-1 md:px-4 md:py-2  border rounded-md ${
                        selectedColor === color
                          ? "border-red-500"
                          : "border-gray-300"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {selectedColor === color && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Size Selection */}
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="text-sm min-w-16">Kích thước:</div>
                <div className="text-blue-500 text-sm">
                  {selectedSize || (
                    <span className="text-gray-400">Chọn size</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {allSizes.map((size) => {
                  const disabled =
                    !selectedColor ||
                    !isColorSizeAvailable(selectedColor, size);
                  return (
                    <button
                      key={size}
                      onClick={() =>
                        !disabled &&
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      disabled={disabled}
                      className={`relative px-4 py-1 md:px-4 md:py-2 border rounded-md ${
                        selectedSize === size
                          ? "border-red-500"
                          : "border-gray-300"
                      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {selectedSize === size && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                      {size}
                    </button>
                  );
                })}
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
                disabled={!selectedColor || !selectedSize}
                onClick={() => {
                  if (!selectedColor || !selectedSize) return;
                  dispatch(
                    addToCart({
                      productId: product._id,
                      color: selectedColor,
                      size: selectedSize,
                      quantity,
                    })
                  );
                }}
              >
                THÊM VÀO GIỎ
              </Button>
              <Button
                variant="contained"
                color="error"
                className={`py-3 ${isDesktop ? "w-1/2" : "w-full"}`}
                disabled={!selectedColor || !selectedSize}
                onClick={handleCheckout}
              >
                MUA NGAY
              </Button>
            </div>
            {/* Voucher Navigation */}
            <div className="flex justify-end my-2">
              <div className="flex gap-2">
                <button
                  className="w-8 h-8 flex items-center justify-center  rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={handlePrevVoucher}
                  disabled={voucherPage === 0}
                >
                  <ArrowBack fontSize="small" />
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center  rounded-full text-gray-500 hover:bg-gray-100"
                  onClick={handleNextVoucher}
                  disabled={
                    voucherPage + 1 >=
                    Math.ceil(vouchers.length / vouchersPerPage)
                  }
                >
                  <ArrowForward fontSize="small" />
                </button>
              </div>
            </div>
            {/* Vouchers */}
            <div
              className="flex md:flex-row flex-col md:justify-between  md:items-center gap-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {pagedVouchers.map((voucher) => (
                <div
                  key={voucher._id}
                  className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 "
                >
                  <div className="flex">
                    <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <img
                        src={voucher_icon}
                        alt="Voucher"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-800">
                          Giảm{" "}
                          {voucher.discountType === "percent"
                            ? `${voucher.discountValue}%`
                            : formatPrice(voucher.discountValue)}{" "}
                          {voucher.maxDiscount
                            ? ` (tối đa ${formatPrice(voucher.maxDiscount)})`
                            : ""}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Đơn hàng từ {formatPrice(voucher.minOrderValue)}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="text-xs text-gray-500 mr-2">
                          <span className="font-medium">Mã: </span>
                          {voucher.code}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">HSD: </span>
                          {formatDate(voucher.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    color="error"
                    size="small"
                    variant="contained"
                    onClick={() => {
                      navigator.clipboard.writeText(voucher.code);
                      setCopiedVoucher(voucher._id);
                      setTimeout(() => setCopiedVoucher(null), 2000);
                    }}
                  >
                    {copiedVoucher === voucher._id
                      ? "Đã sao chép"
                      : "Sao chép mã"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Product Description - Desktop Only */}
        {isDesktop && (
          <div
            className="bg-white mt-2 p-6 max-w-7xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <p className="text-gray-700">{product?.description}</p>
              </div>
            </div>
          </div>
        )}
        {/* Related Products */}
        <div
          className="bg-white mt-2 p-6 max-w-7xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="550"
        >
          <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {similarProducts.map((item, index) => (
              <Product_item product={item} key={index} />
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;