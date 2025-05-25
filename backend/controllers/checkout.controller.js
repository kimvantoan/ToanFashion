import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
export const getCheckoutData = async (req, res) => {
  const { fromCart, productId, color, size, quantity } = req.body;
  const userId = req.user._id;

  try {
    let checkoutItems = [];

    if (fromCart) {
      const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price discount images variants');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Giỏ hàng trống' });
      }

      checkoutItems = cart.items.map(item => {
        const product = item.productId;
        const variant = product.variants.find(v => v.color === item.color);
        const sizeEntry = variant?.sizes.find(s => s.size === item.size);

        return {
          productId: product._id,
          name: product.name,
          image: product.images[0],
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: Math.round(product.price * (1 - (product.discount || 0) / 100)),
          stock: sizeEntry?.stock ?? 0
        };
      });

    } else {
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });

      const variant = product.variants.find(v => v.color === color);
      const sizeEntry = variant?.sizes.find(s => s.size === size);
      if (!variant || !sizeEntry) {
        return res.status(400).json({ message: 'Thông tin biến thể không hợp lệ' });
      }

      checkoutItems.push({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        color,
        size,
        quantity,
        price: Math.round(product.price * (1 - (product.discount || 0) / 100)),
        stock: sizeEntry.stock
      });
    }

    res.json(checkoutItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Không thể lấy dữ liệu checkout' });
  }
};
