import Category from '../models/category.model.js';
import slugify from 'slugify';
import cloudinary from '../config/cloudinary.js';
// [GET] /api/categories
export const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

// [GET] /api/categories/:slug
export const getCategoryBySlug = async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) return res.status(404).json({ message: 'Không tìm thấy danh mục' });
  res.json(category);
};

// [POST] /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const image = req.file ? {
      url: req.file.path,
      public_id: req.file.filename
    } : null;

    const slug = slugify(name, { lower: true, strict: true });

    const category = new Category({ name, slug, description, image });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Tạo category thất bại' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });

    if (name && name !== category.name) {
      category.name = name;
      category.slug = slugify(name, { lower: true, strict: true });
    }

    if (description) category.description = description;

    if (req.file) {
      // Xoá ảnh cũ
      if (category.image?.public_id) {
        await cloudinary.uploader.destroy(category.image.public_id);
      }
      category.image = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Cập nhật category thất bại' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Không tìm thấy category' });

    if (category.image?.public_id) {
      await cloudinary.uploader.destroy(category.image.public_id);
    }

    await category.remove();
    res.json({ message: 'Xóa category thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Xóa category thất bại' });
  }
};
