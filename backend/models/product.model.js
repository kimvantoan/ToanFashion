import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, default: 0 }
}, { _id: false });

const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  sizes: [sizeSchema]
}, { _id: false });

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [imageSchema],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: String,
  variants: [variantSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
