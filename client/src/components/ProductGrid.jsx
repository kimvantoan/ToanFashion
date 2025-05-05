import React from 'react'
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const ProductGrid = () => {
    const products = [
        {
          id: 1,
          name: "Áo Sơ Mi Lụa Cao Cấp ZARA",
          brand: "ZARA",
          price: 1290000,
          originalPrice: 1890000,
          discount: 30,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 2,
          name: "Váy Liền Dáng Xòe H&M",
          brand: "H&M",
          price: 1390000,
          originalPrice: 1990000,
          discount: 30,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 3,
          name: "Áo Khoác Denim GUCCI",
          brand: "GUCCI",
          price: 2990000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 4,
          name: "Quần Jeans Ống Đứng CHANEL",
          brand: "CHANEL",
          price: 3490000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 5,
          name: "Túi Xách Da Thật DIOR",
          brand: "DIOR",
          price: 3490000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 6,
          name: "Áo Thun Họa Tiết PRADA",
          brand: "PRADA",
          price: 2090000,
          originalPrice: 2990000,
          discount: 30,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 7,
          name: "Giày Cao Gót VERSACE",
          brand: "VERSACE",
          price: 1990000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 8,
          name: "Đầm Dạ Hội BALENCIAGA",
          brand: "BALENCIAGA",
          price: 3650000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 9,
          name: "Áo Khoác Bomber FENDI",
          brand: "FENDI",
          price: 5590000,
          originalPrice: 7990000,
          discount: 30,
          image: "/placeholder.svg?height=300&width=250",
        },
        {
          id: 10,
          name: "Ví Da Cao Cấp LOUIS VUITTON",
          brand: "LOUIS VUITTON",
          price: 2790000,
          originalPrice: null,
          discount: null,
          image: "/placeholder.svg?height=300&width=250",
        },
      ]
    
      // Format price with Vietnamese currency
      const formatPrice = (price) => {
        return new Intl.NumberFormat("vi-VN").format(price) + "₫"
      }
    
      useEffect(() => {
        // Refresh AOS when component mounts
        if (typeof AOS !== "undefined") {
          AOS.init({
            duration: 800,
            once: false,
          })
          AOS.refresh()
        }
      }, [])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
    {products.map((product, index) => (
      <div
        key={product.id}
        className="rounded-md overflow-hidden group bg-white shadow-sm hover:shadow-md transition-shadow"
        data-aos="fade-up"
        data-aos-delay={100 + index * 50}
        data-aos-duration="800"
      >
        <div className="relative">
          <image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={250}
            height={300}
            className="w-full h-[300px] object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h3 className="font-medium mb-2 line-clamp-2 h-12">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ProductGrid