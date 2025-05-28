import Cart from '../models/cart.model.js';

// Get current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId', 'name price images');
    res.json(cart || { userId: req.user._id, items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Lấy giỏ hàng thất bại' });
  }
};

// Add or update item in cart
export const addToCart = async (req, res) => {
  try {
    const { productId, color, size, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ productId, color, size, quantity }]
      });
    } else {
      const existingItem = cart.items.find(
        item =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, color, size, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Thêm vào giỏ hàng thất bại' });
  }
};

// Update quantity of an item in cart
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { productId, color, size, quantity } = req.body;
    if (quantity < 1) {
      return res.status(400).json({ message: 'Số lượng phải lớn hơn 0' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    const item = cart.items.find(
      item =>
        item.productId.toString() === productId &&
        item.color === color &&
        item.size === size
    );

    if (!item) return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật số lượng thất bại' });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    if (cart.items.length === 0) {
      await Cart.deleteOne({ userId: req.user._id });
      return res.json({ message: 'Đã xoá sản phẩm và giỏ hàng trống nên đã xoá giỏ hàng' });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Xoá khỏi giỏ hàng thất bại' });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Không tìm thấy giỏ hàng' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Đã xoá toàn bộ giỏ hàng' });
  } catch (err) {
    res.status(500).json({ message: 'Không thể xoá giỏ hàng' });
  }
};
