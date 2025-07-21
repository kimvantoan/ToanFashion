import { useState, useEffect } from "react";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
  Add,
  Remove,
  Delete,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router";
import formatPrice  from "../utils/Format_price";
import formatDate from "../utils/formatDate";
import voucher_icon from "../assets/voucher_icon.png";
import {
  fetchCart,
  removeFromCart,
  updateCartItemQuantity,
} from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckout } from "../features/checkout/checkoutSlice";
import { fetchVouchers } from "../features/voucher/voucherSlice";
const Cart = () => {
  const [copiedVoucher, setCopiedVoucher] = useState(null);
  const navigate = useNavigate();
  const handleCheckout = () => {
    dispatch(fetchCheckout({ fromCart: true }));
    sessionStorage.setItem("checkoutData", JSON.stringify({ fromCart: true }));
    navigate("/checkout");
  };
  const { vouchers } = useSelector((state) => state.voucher);
  const [voucherPage, setVoucherPage] = useState(0);
  const vouchersPerPage = 2;

  const handlePrevVoucher = () => {
    setVoucherPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextVoucher = () => {
    setVoucherPage((prev) =>
      prev + 1 < Math.ceil(vouchers.length / vouchersPerPage) ? prev + 1 : prev
    );
  };

  const pagedVouchers = vouchers.slice(
    voucherPage * vouchersPerPage,
    voucherPage * vouchersPerPage + vouchersPerPage
  );

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchVouchers());
  }, [dispatch]);
  const cartItem = cart?.items || [];
  return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-600">
          <Link to="/" className="hover:text-red-600 transition-colors">
            Trang chủ
          </Link>
          <span>/</span>
          <span className="text-red-600">Giỏ hàng ({cartItem?.length})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6 gap-0">
          {/* Left column - Cart items */}
          <div className="lg:col-span-2" data-aos="fade-up">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-xl font-medium text-red-600 mb-4">
                Giỏ hàng của bạn
              </h1>
              <p className="text-gray-700 mb-6">
                Bạn đang có{" "}
                <span className="font-medium text-red-600">
                  {cartItem?.length} sản phẩm
                </span>{" "}
                trong giỏ hàng
              </p>

              <div className="space-y-6">
                {cartItem.map((cart) => (
                  <CartItem key={cart._id} cart={cart} />
                ))}
              </div>
            </div>
          </div>
          <div
            className="lg:col-span-1"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
              <h2 className="text-xl font-medium text-red-600 mb-6">
                Thông tin đơn hàng
              </h2>

              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-800 font-medium">Tổng tiền:</span>
                <span className="text-2xl font-bold text-red-600">
                  {formatPrice(
                    cartItem.reduce((total, item) => {
                      const price =
                        item.productId.discount || item.productId.price;
                      return total + price * item.quantity;
                    }, 0)
                  )}
                </span>
              </div>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span className="text-gray-600 text-sm">
                    Mã giảm giá được nhập ở trang Thanh toán.
                  </span>
                </li>
              </ul>

              <Button
                onClick={handleCheckout}
                variant="contained"
                color="error"
                className="w-full"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                THANH TOÁN
              </Button>

              {/* Voucher navigation */}
              <div className="flex justify-end my-4">
                <div className="flex gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100"
                    onClick={handlePrevVoucher}
                    disabled={voucherPage === 0}
                  >
                    <ArrowBack fontSize="small" />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100"
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
                className="space-y-4"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                {pagedVouchers.map((voucher) => (
                  <div
                    key={voucher._id}
                    className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 relative"
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
        </div>
      </div>
  );
};

export default Cart;

const CartItem = ({ cart }) => {
  const dispatch = useDispatch();
  const price = cart?.productId?.price || 0;
  const discount = cart?.productId?.discount || 0;
  const finalPrice = discount > 0 ? discount : price;

  const handleUpdate = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCartItemQuantity({
        id: cart._id,
        data: { quantity: newQuantity },
      })
    );
  };

  return (
    <div
      key={cart._id}
      className="flex flex-col sm:flex-row shadow  rounded-lg p-4 relative"
    >
      <div className="flex items-start">
        <div className="w-20 h-20 relative mr-4">
          <img
            src={
              Array.isArray(cart?.productId?.images) &&
              cart.productId.images.length > 0
                ? cart.productId.images[0].url
                : "/placeholder.svg"
            }
            alt={cart?.productId?.name}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-gray-800 font-medium mb-1">
            {cart?.productId?.name}
          </h3>
          <div className="flex items-center mb-2">
            {discount > 0 ? (
              <span className="text-red-600 text-base font-semibold">
                {formatPrice(discount)}
              </span>
            ) : (
              <span className="text-gray-800 text-base font-semibold">
                {formatPrice(price)}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-xs">
            {cart.color} - {cart.size}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 sm:mt-0 sm:ml-auto">
        <div className="text-lg font-medium text-gray-800">
          {formatPrice(finalPrice * cart.quantity)}
        </div>
        <div className="flex items-center ml-6">
          <IconButton
            onClick={() => handleUpdate(cart.quantity - 1)}
            size="small"
            className="border border-gray-300"
          >
            <Remove fontSize="small" />
          </IconButton>
          <span className="mx-3 w-6 text-center">{cart.quantity}</span>
          <IconButton
            onClick={() => handleUpdate(cart.quantity + 1)}
            size="small"
            className="border border-gray-300"
          >
            <Add fontSize="small" />
          </IconButton>
        </div>
      </div>
      <IconButton
        size="small"
        className="border border-gray-300"
        onClick={() => dispatch(removeFromCart(cart._id))}
      >
        <Delete fontSize="small" color="error" />
      </IconButton>
    </div>
  );
};
