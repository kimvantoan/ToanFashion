import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../features/category/categorySlice";
import {
  getProductById,
  updateProduct,
} from "../../features/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import slugify from "slugify";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Button from '@mui/material/Button';

const BRANDS = [
  { _id: "nike", name: "Nike" },
  { _id: "adidas", name: "Adidas" },
  { _id: "puma", name: "Puma" },
  { _id: "mlb", name: "MLB" },
];

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // States giống AddProduct
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");

  // Lấy categories và product
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const { categories } = useSelector((state) => state.category);
  const { product,loading } = useSelector((state) => state.product);
  // Xử lý chọn file ảnh mới
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      featured: false,
      isOld: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  // Kéo thả ảnh
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      featured: false,
      isOld: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Xoá ảnh (cả mới và cũ)
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Đặt ảnh featured
  const setFeaturedImage = (id) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        featured: img.id === id,
      }))
    );
  };

  // Đổi vị trí ảnh
  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  // Chọn size cho variant
  const handleSizeSelect = (variantId, size) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) => {
        if (variant.id === variantId) {
          const newSelectedSizes = variant.selectedSizes.includes(size)
            ? variant.selectedSizes.filter((s) => s !== size)
            : [...variant.selectedSizes, size];
          const newSizeStocks = { ...variant.sizeStocks };
          if (!newSelectedSizes.includes(size)) {
            delete newSizeStocks[size];
          }
          return {
            ...variant,
            selectedSizes: newSelectedSizes,
            sizeStocks: newSizeStocks,
          };
        }
        return variant;
      })
    );
  };

  // Đổi số lượng tồn kho cho size
  const handleStockChange = (variantId, size, value) => {
    const stockValue = parseInt(value) || 0;
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              sizeStocks: {
                ...variant.sizeStocks,
                [size]: stockValue,
              },
            }
          : variant
      )
    );
  };

  // Thêm variant mới
  const addVariant = () => {
    const newVariant = {
      id: Math.random().toString(36).substring(7),
      color: "",
      isOpen: true,
      selectedSizes: [],
      sizeStocks: {},
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  // Xoá variant
  const removeVariant = (variantId) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== variantId));
  };

  // Đóng/mở variant
  const toggleVariant = (variantId) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? { ...variant, isOpen: !variant.isOpen }
          : variant
      )
    );
  };

  // Đổi tên sản phẩm và tự động sinh slug
  const handleNameChange = (e) => {
    const name = e.target.value;
    setProductName(name);
    setProductSlug(slugify(name, { lower: true, strict: true }));
  };
  // Fill dữ liệu khi có product
  useEffect(() => {
    if (product) {
      setProductName(product.name || "");
      setProductDescription(product.description || "");
      setProductSlug(product.slug || "");
      setSelectedCategory(product.category._id || "");
      setSelectedBrand(product.brand || "");
      setBasePrice(product.price || "");
      setDiscountPrice(product.discount || "");
      setHasVariants(product.variants && product.variants.length > 0);
      setVariants(
        product.variants?.map((v, idx) => ({
          id: idx + "",
          color: v.color,
          isOpen: true,
          selectedSizes: v.sizes?.map((s) => s.size) || [],
          sizeStocks:
            v.sizes?.reduce((acc, s) => ({ ...acc, [s.size]: s.stock }), {}) ||
            {},
        })) || []
      );
      setImages(
        (product.images || []).map((img, idx) => ({
          id: idx + "",
          file: null,
          preview: img.url || img, // tuỳ backend trả về
          featured: img.featured || false,
          isOld: true,
        }))
      );
    }
  }, [product]);

  // Hàm submit update
  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedVariants = variants.map((variant) => ({
      color: variant.color,
      sizes: variant.selectedSizes.map((size) => ({
        size,
        stock: variant.sizeStocks[size] || 0,
      })),
    }));

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("slug", productSlug);
    formData.append("category", selectedCategory);
    formData.append("variants", JSON.stringify(formattedVariants));
    images.forEach((img) => {
      if (!img.isOld && img.file) formData.append("images", img.file);
    });
    formData.append("brand", selectedBrand);
    formData.append("price", basePrice);
    formData.append("discount", discountPrice);
    // Có thể cần gửi danh sách ảnh cũ để giữ lại
    formData.append(
      "oldImages",
      JSON.stringify(images.filter((i) => i.isOld).map((i) => i.preview))
    );
    dispatch(updateProduct({ id, data: formData }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              <KeyboardArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="ml-4 text-2xl font-semibold text-gray-900">
              Edit Product
            </h1>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap">
              Cancel
            </button>
            <Button
              variant="contained"
              loading={loading}
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
            >
              Save
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Product Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Product Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="productSlug"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productSlug"
                    value={productSlug}
                    onChange={(e) => setProductSlug(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="product-slug"
                  />
                </div>
                <div>
                  <label
                    htmlFor="productDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product description"
                  ></textarea>
                </div>
              </div>
            </div>
            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Images</h2>
              <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
              />
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl"></i>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                  >
                    Add File
                  </button>
                  <p className="text-sm text-gray-500">
                    Or drag and drop files
                  </p>
                </div>
              </div>
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={image.id}
                      className={`relative group rounded-lg overflow-hidden ${
                        image.featured ? "ring-2 ring-blue-500" : ""
                      }`}
                      draggable
                      onDragStart={(e) =>
                        e.dataTransfer.setData("text/plain", index.toString())
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const fromIndex = parseInt(
                          e.dataTransfer.getData("text/plain")
                        );
                        reorderImages(fromIndex, index);
                      }}
                    >
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setFeaturedImage(image.id)}
                          className="p-1.5 bg-white rounded-full text-gray-700 hover:text-blue-600"
                        >
                          <i
                            className={`fas fa-star ${
                              image.featured ? "text-yellow-400" : ""
                            }`}
                          ></i>
                        </button>
                        <button
                          onClick={() => removeImage(image.id)}
                          className=" text-white hover:text-red-600"
                        >
                          <DeleteOutlineIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Price */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Price</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="basePrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Base Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="basePrice"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter price"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="discountPrice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Discount Price
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Price after discount"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Variants */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Variants</h2>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      id="hasVariants"
                      checked={hasVariants}
                      onChange={() => setHasVariants(!hasVariants)}
                      value=""
                    />
                    <div className="group peer bg-white rounded-full duration-300 w-10 h-5 ring-2  after:bg-gray-500 peer-checked:after:bg-blue-500 peer-checked:ring-blue-500 after:rounded-full after:absolute after:h-5 after:w-5  after:flex after:justify-center after:items-center peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>
              {hasVariants && (
                <div className="space-y-6">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="border border-gray-200 rounded-md overflow-hidden"
                    >
                      <div
                        className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => toggleVariant(variant.id)}
                      >
                        <div className="flex items-center">
                          <i
                            className={`fas fa-chevron-${
                              variant.isOpen ? "down" : "right"
                            } mr-2 text-gray-500`}
                          ></i>
                          <span className="font-medium text-gray-700">
                            {variant.color || "New Variant"}
                          </span>
                        </div>
                        {variants.length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeVariant(variant.id);
                            }}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}
                      </div>
                      {variant.isOpen && (
                        <div className="p-4">
                          <div className="mb-4">
                            <label
                              htmlFor={`colorVariant-${variant.id}`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Color
                            </label>
                            <input
                              type="text"
                              id={`colorVariant-${variant.id}`}
                              value={variant.color}
                              onChange={(e) => {
                                setVariants((prev) =>
                                  prev.map((v) =>
                                    v.id === variant.id
                                      ? { ...v, color: e.target.value }
                                      : v
                                  )
                                );
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g. Blue"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Sizes with Stock
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {["S", "M", "L", "XL", "XXL"].map((size) => (
                                <button
                                  key={size}
                                  onClick={() =>
                                    handleSizeSelect(variant.id, size)
                                  }
                                  className={`px-3 py-1 text-sm border rounded-md cursor-pointer whitespace-nowrap ${
                                    variant.selectedSizes.includes(size)
                                      ? "bg-blue-100 border-blue-500 text-blue-700"
                                      : "border-gray-300 text-gray-700"
                                  }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                          {variant.selectedSizes.length > 0 && (
                            <div className="space-y-3 mt-4">
                              {variant.selectedSizes.map((size) => (
                                <div
                                  key={size}
                                  className="flex items-center gap-3"
                                >
                                  <span className="w-10 text-sm font-medium text-gray-700">
                                    {size}
                                  </span>
                                  <input
                                    type="number"
                                    value={variant.sizeStocks[size] || ""}
                                    onChange={(e) =>
                                      handleStockChange(
                                        variant.id,
                                        size,
                                        e.target.value
                                      )
                                    }
                                    className="w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Stock"
                                    min="0"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addVariant}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center cursor-pointer whitespace-nowrap"
                  >
                    <i className="fas fa-plus mr-1"></i> Add Another Variant
                  </button>
                </div>
              )}
            </div>
            {/* Shipping */}
          </div>
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Categories
              </h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      id={`category-${category._id}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category._id}
                      onChange={() => setSelectedCategory(category._id)}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="ml-3 block text-sm text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Brand */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Brand</h2>
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  <option value="">Select brand</option>
                  {BRANDS.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
