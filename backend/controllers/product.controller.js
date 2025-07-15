import Product from "../models/product.model.js";
import Category from "../models/category.model.js"; // Thêm dòng này ở đầu file
import slugify from "slugify";
import cloudinary from "../config/cloudinary.js";
export const getProducts = async (req, res) => {
  try {
    const { brand, category, type, sort, search, limit } = req.query;
    let filter = {};

    // Tìm theo brand
    if (brand) {
      const brands = brand.split(',').map(b => b.trim());
      filter.brand = { $in: brands };
    }

    // Tìm theo category slug
    if (category) {
      const foundCategory = await Category.findOne({ slug: category });
      if (foundCategory) {
        filter.category = foundCategory._id;
      } else {
        return res.status(404).json({ message: "Không tìm thấy danh mục" });
      }
    }

    // Tìm theo tên (search)
    if (search) {
      filter.name = { $regex: search, $options: "i" }; 
    }

    // Tạo truy vấn
    let query = Product.find(filter).populate("category", "name slug");

    // Sắp xếp
    if (type === "new") {
      query = query.sort({ createdAt: -1 });
    } else if (sort) {
      if (sort === "price-asc") query = query.sort({ price: 1 });
      else if (sort === "price-desc") query = query.sort({ price: -1 });
      else if (sort === "name-asc") query = query.sort({ name: 1 });
    }

    // Áp dụng limit nếu có
    if (limit) {
      const parsedLimit = parseInt(limit);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        query = query.limit(parsedLimit);
      }
    }

    const products = await query;
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm" });
  }
};


// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    "category",
    "name slug"
  );
  if (!product)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm by slug" });
  res.json(product);
};

export const getNewProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 }) 
      .populate("category", "name slug");
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm mới nhất" });
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const category = await Category.findOne({ slug: categorySlug });
    
    if (!category)
      return res.status(404).json({ message: "Không tìm thấy danh mục" });

    const products = await Product.find({ category: category._id }).populate(
      "category",
      "name slug"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sản phẩm theo danh mục" });
  }
};
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name slug"
  );
  if (!product)
    return res.status(404).json({ message: "Không tìm thấy sản phẩm by id" });
  res.json(product);
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    let {
      name,
      description,
      price,
      discount,
      category,
      brand,
      variants,
      slug,
    } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const product = new Product({
      name,
      slug,
      description,
      price: Number(price),
      discount: Number(discount),
      images,
      category,
      brand,
      variants: JSON.parse(variants || '[]'),
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm' });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    const { name, description, price, discount, category, brand, variants } =
      req.body;

    if (name && name !== product.name) {
      product.slug = slugify(name, { lower: true, strict: true });
      product.name = name;
    }
    if (description) product.description = description;
    if (price) product.price = price;
    if (discount) product.discount = discount;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (variants) product.variants = JSON.parse(variants);

    // Nếu có ảnh mới upload, thêm vào images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
      product.images.push(...newImages);
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật sản phẩm" });
  }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    for (const img of product.images) {
      try {
        await cloudinary.uploader.destroy(img.public_id);
      } catch (err) {
        console.warn("Lỗi xóa ảnh Cloudinary:", err.message);
      }
    }

    await product.deleteOne();
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });

    // Tìm ảnh trong mảng images theo _id (hoặc có thể theo public_id)
    const image = product.images.id(imageId);
    if (!image) return res.status(404).json({ message: "Không tìm thấy ảnh" });

    // Xóa ảnh trên Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Xóa ảnh khỏi mảng images
    image.remove();

    await product.save();

    res.json({ message: "Xóa ảnh thành công", images: product.images });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa ảnh sản phẩm" });
  }
};
