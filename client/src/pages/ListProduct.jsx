import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Drawer,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Close,
  FilterList,
} from "@mui/icons-material";
import Product_item from "../components/Product_item";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { fetchCategoryBySlug } from "../features/category/categorySlice";
import { useNavigate, useLocation } from "react-router";
import {
  fetchWish,
  addToWish,
  removeFromWish,
} from "../features/wish/wishSlice";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const categories = [
  { id: "new", name: "Sản phẩm mới" },
  { id: "all", name: "Tất cả sản phẩm" },
];

const BRANDS = [
  { _id: "Nike", name: "Nike" },
  { _id: "Adidas", name: "Adidas" },
  { _id: "Puma", name: "Puma" },
  { _id: "MLB", name: "MLB" },
];

const ListProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [scrollPosition, setScrollPosition] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const { category } = useSelector((state) => state.category);
  const { products, loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchWish());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleAddToWish = (id) => {
    dispatch(addToWish({ productId: id }));
  };
  const handleRemoveFromWish = (id) => {
    dispatch(removeFromWish(id));
  };
  // Lấy brands từ query string khi load trang
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brandParam = params.get("brand");
    setSelectedBrands(brandParam ? brandParam.split(",") : []);
  }, [location.search]);

  // Lấy tên danh mục khi có param category
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categorySlug = params.get("category");
    if (categorySlug) dispatch(fetchCategoryBySlug(categorySlug));
  }, [dispatch, location.search]);

  // Cập nhật categoryName khi category thay đổi
  useLayoutEffect(() => {
    if (category?.name) setCategoryName(category.name);
  }, [category]);

  // Xử lý khi click vào danh mục
  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(location.search);
    if (category.id === "all" || category.id === "new") {
      params.set("type", category.id);
      params.delete("category");
    } else {
      params.set("category", category.id);
      params.delete("type");
    }
    navigate(`/collection?${params.toString()}`);
  };

  // Xử lý khi chọn brand
  const handleBrandChange = (brand) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newSelectedBrands);

    const params = new URLSearchParams(location.search);
    newSelectedBrands.length
      ? params.set("brand", newSelectedBrands.join(","))
      : params.delete("brand");
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    const params = new URLSearchParams(location.search);
    if (value && value !== "default") {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Gọi fetchProducts khi URL param thay đổi
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fetchParams = {};
    if (params.get("brand")) fetchParams.brand = params.get("brand");
    if (params.get("type")) fetchParams.type = params.get("type");
    if (params.get("category")) fetchParams.category = params.get("category");
    if (params.get("sort")) fetchParams.sort = params.get("sort");
    dispatch(fetchProducts(fetchParams));
  }, [dispatch, location.search]);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderCategories = (isMobile = false) => (
    <div
      className="mb-6"
      data-aos="fade-right"
      data-aos-delay={isMobile ? "100" : "100"}
    >
      <div
        className="flex justify-between items-center cursor-pointer mb-3 bg-gray-50 p-3 rounded-lg"
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        <h3 className="font-medium">Danh mục sản phẩm</h3>
        {categoryOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      <div
        className={`ml-2 space-y-2 overflow-hidden transition-all duration-300 ${
          categoryOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="text-gray-700 hover:text-rose-600 cursor-pointer py-2 px-3 hover:bg-gray-50 rounded-md transition-colors"
            data-aos="fade-left"
            data-aos-delay={100 + index * 50}
            onClick={() => handleCategoryClick(category)}
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrands = (isMobile = false) => (
    <div
      className="mb-6"
      data-aos="fade-right"
      data-aos-delay={isMobile ? "200" : "200"}
    >
      <div
        className="flex justify-between items-center cursor-pointer mb-3 bg-gray-50 p-3 rounded-lg"
        onClick={() => setBrandOpen(!brandOpen)}
      >
        <h3 className="font-medium">Nhà cung cấp</h3>
        {brandOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      </div>
      <div
        className={`ml-2 overflow-hidden transition-all duration-300 ${
          brandOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <FormGroup className="ml-2">
          {BRANDS.map((brand, index) => (
            <FormControlLabel
              key={brand._id}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => handleBrandChange(brand._id)}
                  size="small"
                />
              }
              label={brand.name}
              className="py-1"
              data-aos="fade-left"
              data-aos-delay={200 + index * 50}
            />
          ))}
        </FormGroup>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header
        className={`sticky top-0 z-30 bg-white shadow-sm transition-all duration-300 ${
          scrollPosition > 50 ? "py-2" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconButton
                sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                <FilterList />
              </IconButton>
              <h1 className="text-xl font-medium text-rose-600">
                {(() => {
                  const params = new URLSearchParams(location.search);
                  if (params.get("type") === "new") return "Sản phẩm mới";
                  if (params.get("type") === "all") return "Tất cả sản phẩm";
                  if (params.get("category") && categoryName)
                    return `Danh mục: ${categoryName}`;
                  return "Danh sách sản phẩm";
                })()}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-gray-600 hidden md:inline-block"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                {products.length} sản phẩm
              </span>
              <FormControl
                size="small"
                className="w-32 md:w-40 hidden md:block"
              >
                <InputLabel id="sort-label">Sắp xếp</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sortOption}
                  label="Sắp xếp"
                  onChange={handleSortChange}
                >
                  <MenuItem value="default">Mặc định</MenuItem>
                  <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                  <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile Drawer */}
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleSidebar}
          className="md:hidden"
        >
          <div className="w-72">
            <div className="p-4 flex justify-between items-center border-b">
              <h2 className="font-medium">Bộ lọc sản phẩm</h2>
              <IconButton onClick={toggleSidebar} size="small">
                <Close />
              </IconButton>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100vh-60px)]">
              {renderCategories(true)}
              {renderBrands(true)}
            </div>
          </div>
        </Drawer>

        {/* Sidebar - Desktop */}
        <aside
          className="hidden md:block sticky top-20 h-[calc(100vh-5rem)] w-64 bg-white shadow-sm p-4 overflow-y-auto"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          {renderCategories()}
          {renderBrands()}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products?.map((product) => (
                  <Product_item
                    key={product._id}
                    product={product}
                    handleAddToWish={handleAddToWish}
                    handleRemoveFromWish={handleRemoveFromWish}
                  />
                ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListProduct;
