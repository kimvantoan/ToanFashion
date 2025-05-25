import Product from '../models/product.model.js';
import slugify from 'slugify';
import cloudinary from '../config/cloudinary.js';
// GET /api/products
export const getProducts = async (req, res) => {
  const products = await Product.find({}).populate('category', 'name slug');
  res.json(products);
};

// GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category', 'name slug');
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json(product);
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discount, category, brand, variants } = req.body;

    const images = req.files?.map(file => ({
      url: file.path,
      public_id: file.filename
    })) || [];

    const slug = slugify(name, { lower: true, strict: true });

    const product = new Product({
      name,
      slug,
      description,
      price,
      discount,
      images,
      category,
      brand,
      variants: JSON.parse(variants || '[]'),
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo sản phẩm' });
  }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    const {
      name,
      description,
      price,
      discount,
      category,
      brand,
      variants
    } = req.body;

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
      const newImages = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }));
      product.images.push(...newImages);
    }

    await product.save();
    res.json(product);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm' });
  }
};


// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // Xóa ảnh trên Cloudinary
    for (const img of product.images) {
      try {
        await cloudinary.uploader.destroy(img.public_id);
      } catch (err) {
        console.warn('Lỗi xóa ảnh Cloudinary:', err.message);
      }
    }

    await product.remove();
    res.json({ message: 'Xóa sản phẩm thành công' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
  }
};

export const deleteProductImage = async (req, res) => {
  try {
    const { id, imageId } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    // Tìm ảnh trong mảng images theo _id (hoặc có thể theo public_id)
    const image = product.images.id(imageId);
    if (!image) return res.status(404).json({ message: 'Không tìm thấy ảnh' });

    // Xóa ảnh trên Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Xóa ảnh khỏi mảng images
    image.remove();

    await product.save();

    res.json({ message: 'Xóa ảnh thành công', images: product.images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi xóa ảnh sản phẩm' });
  }
};
