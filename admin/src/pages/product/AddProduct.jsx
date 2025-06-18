import React from "react";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
const AddProduct = () => {
  const [hasVariants, setHasVariants] = useState(false);
  const [variants, setVariants] = useState([
    {
      id: "1",
      color: "",
      isOpen: true,
      selectedSizes: [],
      sizeStocks: {},
    },
  ]);
  const [images, setImages] = useState([]);
  const fileInputRef = React.useRef(null);
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      featured: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const newImages = imageFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      featured: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };
  const setFeaturedImage = (id) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        featured: img.id === id,
      }))
    );
  };
  const reorderImages = (fromIndex, toIndex) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [categories, setCategories] = useState([
    "Women",
    "Men",
    "T-Shirt",
    "Hoodie",
    "Dress",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: null,
  });

  const handleCreateCategory = () => {
    if (categoryForm.name.trim()) {
      const newCategory = {
        name: categoryForm.name.trim(),
        slug:
          categoryForm.slug.trim() ||
          categoryForm.name.trim().toLowerCase().replace(/\s+/g, "-"),
        description: categoryForm.description,
        image: categoryForm.image
          ? {
              url: URL.createObjectURL(categoryForm.image),
              public_id: "",
            }
          : null,
      };

      setCategories([...categories, newCategory.name]);
      setSelectedCategory(newCategory.name);
      setCategoryForm({
        name: "",
        slug: "",
        description: "",
        image: null,
      });
      setIsModalOpen(false);
    }
  };
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
  const removeVariant = (variantId) => {
    setVariants((prev) => prev.filter((variant) => variant.id !== variantId));
  };
  const toggleVariant = (variantId) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId
          ? { ...variant, isOpen: !variant.isOpen }
          : variant
      )
    );
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setProductName(name);
    setProductSlug(
      name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
    );
  };
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
              <KeyboardArrowLeftIcon className="h-5 w-5" />
              <span>Back</span>
            </button>
            <h1 className="ml-4 text-2xl font-semibold text-gray-900">
              Add Product
            </h1>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap">
              Save
            </button>
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
                  />
                </div>
              </div>
            </div>
            {/* Variants */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Variants</h2>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      class="sr-only peer"
                      id="hasVariants"
                      checked={hasVariants}
                      onChange={() => setHasVariants(!hasVariants)}
                      value=""
                    />
                    <div class="group peer bg-white rounded-full duration-300 w-10 h-5 ring-2  after:bg-gray-500 peer-checked:after:bg-blue-500 peer-checked:ring-blue-500 after:rounded-full after:absolute after:h-5 after:w-5  after:flex after:justify-center after:items-center peer-checked:after:translate-x-full"></div>
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
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      name="category"
                      type="radio"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-blue-600 border-gray-300"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-3 block text-sm text-gray-700"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <button
                id="createCategoryBtn"
                onClick={() => setIsModalOpen(true)}
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-plus mr-1"></i> Create New
              </button>
              {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Create New Category
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="categoryName"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="categoryName"
                          type="text"
                          value={categoryForm.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            setCategoryForm((prev) => ({
                              ...prev,
                              name,
                              slug: name
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]+/g, ""),
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter category name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="categorySlug"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Slug <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="categorySlug"
                          type="text"
                          value={categoryForm.slug}
                          onChange={(e) =>
                            setCategoryForm((prev) => ({
                              ...prev,
                              slug: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="category-slug"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="categoryDescription"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Description
                        </label>
                        <textarea
                          id="categoryDescription"
                          value={categoryForm.description}
                          onChange={(e) =>
                            setCategoryForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter category description"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category Image
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <i className="fas fa-image text-gray-400 text-3xl mb-3"></i>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="category-image"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="category-image"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setCategoryForm((prev) => ({
                                      ...prev,
                                      image: file,
                                    }));
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                        {categoryForm.image && (
                          <div className="mt-2 flex items-center">
                            <img
                              src={URL.createObjectURL(categoryForm.image)}
                              alt="Preview"
                              className="h-16 w-16 object-cover rounded"
                            />
                            <button
                              onClick={() =>
                                setCategoryForm((prev) => ({
                                  ...prev,
                                  image: null,
                                }))
                              }
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        id="cancelCategoryBtn"
                        onClick={() => {
                          setIsModalOpen(false);
                          setNewCategoryName("");
                          setParentCategory("");
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                      >
                        Cancel
                      </button>
                      <button
                        id="saveCategoryBtn"
                        onClick={handleCreateCategory}
                        className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Brand */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Brand</h2>
              <div>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter brand name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-button text-gray-700 bg-white hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-button hover:bg-blue-700 cursor-pointer whitespace-nowrap">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
