import React from "react";
import { useState, useEffect } from "react";
import {
  Person,
  Edit,
  Home,
  ShoppingBag,
  Favorite,
  Logout,
  KeyboardArrowDown,
  Close,
} from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import AccountContent from "../components/AccountContent";
import AddressContent from "../components/AddressContent";
import OrdersContent from "../components/OrdersContent";
import WishlistContent from "../components/WishlistContent";
import RootLayout from "../layout/RootLayout";
import { useDispatch, useSelector } from "react-redux";
// Mock data
  
  
import { fetchUserProfile } from "../features/user/userSlice";
const userData = {
  name: "Sofia Havertz",
  profileImage:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pQA9QF12Re3qvPSQLP1R5cCl4osfSy.png",
  addresses: {
    billing: {
      name: "Sofia Havertz",
      phone: "+1 234 567 890",
      address: "345 Long Island, NewYork, Hoa Kỳ",
    },
    shipping: {
      name: "Sofia Havertz",
      phone: "+1 234 567 890",
      address: "345 Long Island, NewYork, Hoa Kỳ",
    },
  },
  orders: [
    {
      id: "#3456_798",
      date: "17/10/2023",
      status: "Đã giao hàng",
      price: "1.234.000₫",
    },
    {
      id: "#3456_980",
      date: "11/10/2023",
      status: "Đã giao hàng",
      price: "345.000₫",
    },
    {
      id: "#3456_120",
      date: "24/08/2023",
      status: "Đã giao hàng",
      price: "2.345.000₫",
    },
    {
      id: "#3456_030",
      date: "12/08/2023",
      status: "Đã giao hàng",
      price: "845.000₫",
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Bàn Khay",
      color: "Đen",
      price: "19.190₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 2,
      name: "Sofa",
      color: "Be",
      price: "345.000₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 3,
      name: "Giỏ tre",
      color: "Be",
      price: "8.800₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
    {
      id: 4,
      name: "Gối",
      color: "Be",
      price: "8.800₫",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UtUsYVfzNgcHYcQaOKWmk5W3YHjkx4.png",
    },
  ],
};
import { logout } from "../features/user/userSlice";
import { useNavigate } from "react-router";
const Account = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigator = useNavigate();
  // const dispatch = useDispatch();
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
    });

    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

const handleLogout = async () => {
  const resultAction = await dispatch(logout());

  if (logout.fulfilled.match(resultAction)) {
    window.location.href = "/login";
  } else {
    console.error("Logout failed:", resultAction.payload);
  }
};

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountContent />;
      case "address":
        return <AddressContent />;
      case "orders":
        return <OrdersContent />;
      case "wishlist":
        return <WishlistContent />;
      default:
        return <AccountContent />;
    }
  };
  return (
    <RootLayout>
      <div className="mx-20 w-screen">
        <h1
          className="text-3xl font-bold text-center my-2 text-[#c4123f]"
          data-aos="fade-down"
        >
          Tài Khoản Của Tôi
        </h1>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar - Desktop */}
          <div className="hidden md:block w-64 bg-gray-50 p-6 rounded-lg">
            <div
              className="flex flex-col items-center mb-6"
              data-aos="fade-right"
            >
              <div className="relative mb-2">
                <img
                  src={userData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md text-[#c4123f]">
                  <Person fontSize="small" />
                </button>
              </div>
              <h2 className="font-medium text-lg">{userData.name}</h2>
            </div>

            <div
              className="space-y-1"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <button
                onClick={() => setActiveTab("account")}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeTab === "account"
                    ? "font-medium border-l-4 border-[#c4123f] text-[#c4123f]"
                    : ""
                }`}
              >
                <Person className="mr-2" fontSize="small" /> Tài Khoản
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeTab === "address"
                    ? "font-medium border-l-4 border-[#c4123f] text-[#c4123f]"
                    : ""
                }`}
              >
                <Home className="mr-2" fontSize="small" /> Địa Chỉ
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeTab === "orders"
                    ? "font-medium border-l-4 border-[#c4123f] text-[#c4123f]"
                    : ""
                }`}
              >
                <ShoppingBag className="mr-2" fontSize="small" /> Đơn Hàng
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left py-3 px-4 rounded-md flex items-center ${
                  activeTab === "wishlist"
                    ? "font-medium border-l-4 border-[#c4123f] text-[#c4123f]"
                    : ""
                }`}
              >
                <Favorite className="mr-2" fontSize="small" /> Yêu Thích
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 rounded-md flex items-center text-[#c4123f]"
              >
                <Logout className="mr-2" fontSize="small" /> Đăng Xuất
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden bg-gray-50 p-4 rounded-lg mb-4 w-full">
            <div className="flex items-center">
              <div className="relative mr-3">
                <img
                  src={userData.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-md text-[#c4123f]">
                  <Person fontSize="small" />
                </button>
              </div>
              <h2 className="font-medium">{userData.name}</h2>
            </div>

            <div className="mt-4 relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex items-center justify-between border p-3 rounded-md bg-white"
              >
                <span>
                  {activeTab === "account" && "Tài Khoản"}
                  {activeTab === "address" && "Địa Chỉ"}
                  {activeTab === "orders" && "Đơn Hàng"}
                  {activeTab === "wishlist" && "Yêu Thích"}
                </span>
                <KeyboardArrowDown />
              </button>

              {mobileMenuOpen && (
                <div
                  className="absolute z-50 bg-white w-full mt-1 border rounded-md shadow-lg"
                  data-aos="fade-down"
                >
                  <button
                    onClick={() => {
                      setActiveTab("account");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50"
                  >
                    <Person className="mr-2" fontSize="small" /> Tài Khoản
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("address");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50"
                  >
                    <Home className="mr-2" fontSize="small" /> Địa Chỉ
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("orders");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50"
                  >
                    <ShoppingBag className="mr-2" fontSize="small" /> Đơn Hàng
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("wishlist");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50"
                  >
                    <Favorite className="mr-2" fontSize="small" /> Yêu Thích
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-3 flex items-center hover:bg-gray-50 text-[#c4123f]"
                  >
                    <Logout className="mr-2" fontSize="small" /> Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div
            className="flex-1 bg-white rounded-lg md:ml-6"
            data-aos="fade-up"
          >
            {renderContent()}
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default Account;
