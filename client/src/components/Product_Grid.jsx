import { useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
const products = [
    {
      id: 1,
      name: "Ghế Văn Phòng / Ghế Giám Đốc Bọc Da ETHAN",
      brand: "ETHAN",
      price: 2793000,
      originalPrice: 3990000,
      discount: "-30%",
      img: "https://blog.dktcdn.net/files/chup-anh-quan-ao-6.jpg",
      inStock: true,
      isNew: false,
    },
    {
      id: 2,
      name: "Ghế Đơn / Ghế Bành Thư Giãn CONNEMARA",
      brand: "CONNEMARA",
      price: 7990000,
      originalPrice: 7990000,
      discount: null,
      img: "/placeholder.svg?height=300&width=300",
      inStock: false,
      isNew: false,
    },
    {
      id: 3,
      name: "Ghế Armchair AURORA bọc vải",
      brand: "MB",
      price: 7115500,
      originalPrice: 7490000,
      discount: "-5%",
      img: "/placeholder.svg?height=300&width=300",
      inStock: true,
      isNew: true,
    },
    {
      id: 4,
      name: "Ghế Bành Thư Giãn HOUSTON",
      brand: "HOUSTON",
      price: 8910000,
      originalPrice: 9900000,
      discount: "-10%",
      img: "/placeholder.svg?height=300&width=300",
      inStock: false,
      isNew: false,
    },
    {
      id: 5,
      name: "Ghế Ăn Gỗ Sồi HARRIS",
      brand: "HARRIS",
      price: 2490000,
      originalPrice: 2490000,
      discount: null,
      img: "https://blog.dktcdn.net/files/chup-anh-quan-ao-6.jpg",
      inStock: true,
      isNew: false,
    },
    {
      id: 5,
      name: "Ghế Ăn Gỗ Sồi HARRIS",
      brand: "HARRIS",
      price: 2490000,
      originalPrice: 2490000,
      discount: null,
      img: "/placeholder.svg?height=300&width=300",
      inStock: true,
      isNew: false,
    },
    {
      id: 5,
      name: "Ghế Ăn Gỗ Sồi HARRIS",
      brand: "HARRIS",
      price: 2490000,
      originalPrice: 2490000,
      discount: null,
      img: "/placeholder.svg?height=300&width=300",
      inStock: true,
      isNew: false,
    },
  ]
const Product_Grid = () => {
    const [cart, setCart] = useState([])

  // Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    })
  }, [])


  // Format giá tiền theo định dạng Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price)
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow"
        data-aos="fade-up"
        data-aos-delay={index * 10}
      >
        <div className="relative">
          <img
            src={product.img || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 sm:h-56 md:h-64 object-cover"
          />

          {/* Discount tag */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}
            </div>
          )}

          {/* New tag */}
          {product.isNew && (
            <div className="absolute top-2 right-2">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">NEW</span>
                </div>
              </div>
            </div>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute top-2 left-2 bg-gray-700 text-white text-xs font-medium px-2 py-1 rounded">
              Hết hàng
            </div>
          )}
        </div>

        <div className="p-3 md:p-4">
          <div className="text-center text-gray-500 text-xs md:text-sm mb-1">{product.brand}</div>
          <h3 className="text-center font-medium text-xs md:text-sm mb-2 h-10 md:h-12 overflow-hidden">
            {product.name}
          </h3>

          <div className="text-center mb-3 md:mb-4">
            <span className="text-red-600 font-bold text-sm md:text-base">{formatPrice(product.price)}₫</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-400 line-through text-xs md:text-sm ml-1 md:ml-2">
                {formatPrice(product.originalPrice)}₫
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Product_Grid