import { useState, useEffect } from "react"
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, IconButton, Tooltip } from "@mui/material"
import { Add, Remove, ArrowBack, ArrowForward, Info } from "@mui/icons-material"
import AOS from "aos"
import "aos/dist/aos.css"
import { Link } from "react-router"
import RootLayout from "../layout/RootLayout"

const Cart = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Thảm Phòng Tắm Nhựa TPE Hoa Tiết Cánh Hoa XING",
      price: 169000,
      image: "https://product.hstatic.net/200000796751/product/rosabella_decoration_cushion_baya_2001469_2_78cbaab9d6f54098a7466357d9c2220d_medium.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Đệm Trang Trí Vải Cotton Nhiều Màu ROSABELLA",
      price: 199000,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      variant: "Cam / Trắng / D45xR45",
    },
  ])

  // Available vouchers
  const [vouchers] = useState([
    {
      id: "v1",
      code: "VOUCHERT3-200K",
      discount: 200000,
      minOrder: 3000000,
      expiryDate: "31/03/2023",
    },
    {
      id: "v2",
      code: "VOUCHERT3-100K",
      discount: 100000,
      minOrder: 2000000,
      expiryDate: "31/03/2023",
    },
  ])

  // State for invoice option
  const [needInvoice, setNeedInvoice] = useState(false)

  // State for order notes
  const [orderNotes, setOrderNotes] = useState("")

  // Calculate total price
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0)

  // Function to update product quantity
  const updateQuantity = (id, change) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          const newQuantity = Math.max(1, product.quantity + change)
          return { ...product, quantity: newQuantity }
        }
        return product
      }),
    )
  }

  // Format price with Vietnamese currency
  const formatPrice = (price) => {
    return `${price.toLocaleString("vi-VN")}₫`
  }
  return (
    <RootLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Navigation */}
      <div className="flex items-center gap-2 text-sm mb-6 text-gray-600">
        <Link to="/" className="hover:text-red-600 transition-colors">
          Trang chủ
        </Link>
        <span>/</span>
        <span className="text-red-600">Giỏ hàng ({products.length})</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Cart items */}
        <div className="lg:col-span-2" data-aos="fade-up">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-xl font-medium text-red-600 mb-4">Giỏ hàng của bạn</h1>
            <p className="text-gray-700 mb-6">
              Bạn đang có <span className="font-medium text-red-600">{products.length} sản phẩm</span> trong giỏ hàng
            </p>

            {/* Product list */}
            <div className="space-y-6">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row shadow  rounded-lg p-4 relative">
                  <div className="flex items-start">
                    <div className="w-20 h-20 relative mr-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium mb-1">{product.name}</h3>
                      <p className="text-gray-500 text-sm mb-2">{product.price.toLocaleString("vi-VN")}₫</p>
                      {product.variant && <p className="text-gray-500 text-xs">{product.variant}</p>}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 sm:mt-0 sm:ml-auto">
                    <div className="text-lg font-medium text-gray-800">{formatPrice(product.price)}</div>
                    <div className="flex items-center ml-6">
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(product.id, -1)}
                        className="border border-gray-300"
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <span className="mx-3 w-6 text-center">{product.quantity}</span>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(product.id, 1)}
                        className="border border-gray-300"
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order notes */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6 mb-6" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-gray-800 font-medium mb-4">Ghi chú đơn hàng</h2>
            <TextField
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              placeholder="Nhập ghi chú cho đơn hàng của bạn"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />
          </div> */}

          {/* Invoice option */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6" data-aos="fade-up" data-aos-delay="150">
            <FormControl component="fieldset">
              <RadioGroup value={needInvoice} onChange={(e) => setNeedInvoice(e.target.value === "true")}>
                <FormControlLabel
                  value={true}
                  control={<Radio color="error" />}
                  label={<span className="text-gray-800">Xuất hoá đơn cho đơn hàng</span>}
                />
              </RadioGroup>
            </FormControl>
          </div> */}
        </div>

        {/* Right column - Order summary */}
        <div className="lg:col-span-1" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
            <h2 className="text-xl font-medium text-red-600 mb-6">Thông tin đơn hàng</h2>

            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-800 font-medium">Tổng tiền:</span>
              <span className="text-2xl font-bold text-red-600">{formatPrice(totalPrice)}</span>
            </div>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-gray-600 text-sm">Phí vận chuyển sẽ được tính ở trang Thanh toán.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-gray-600 text-sm">Mã giảm giá được nhập ở trang Thanh toán.</span>
              </li>
            </ul>

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-md transition-colors mb-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              THANH TOÁN
            </button>

            {/* Voucher navigation */}
            {/* <div className="flex justify-end mb-4">
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100">
                  <ArrowBack fontSize="small" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:bg-gray-100">
                  <ArrowForward fontSize="small" />
                </button>
              </div>
            </div> */}

            {/* Vouchers */}
            {/* <div className="space-y-4" data-aos="fade-up" data-aos-delay="400">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4 relative">
                  <div className="flex">
                    <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                      <image src="/placeholder.svg?height=40&width=40" alt="Voucher" width={40} height={40} />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-medium text-gray-800">Giảm {formatPrice(voucher.discount)}</span>
                        <Tooltip title="Thông tin chi tiết về voucher">
                          <IconButton size="small">
                            <Info fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                      <p className="text-xs text-gray-600">
                        Đơn hàng từ {(voucher.minOrder / 1000000).toFixed(0)} triệu
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="text-xs text-gray-500 mr-2">
                          <span className="font-medium">Mã: </span>
                          {voucher.code}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="font-medium">HSD: </span>
                          {voucher.expiryDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="absolute right-3 bottom-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition-colors">
                    SAO CHÉP MÃ
                  </button>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default Cart;
