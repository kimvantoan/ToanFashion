import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { applyVoucher } from '../utils/applyVoucher.js';

// Create order
export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount, voucherCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Đơn hàng không có sản phẩm' });
    }

    // Kiểm tra và trừ tồn kho từng sản phẩm
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Sản phẩm không tồn tại: ${item.productId}` });
      }

      const variant = product.variants.find(v => v.color === item.color);
      if (!variant) {
        return res.status(400).json({ message: `Không tìm thấy màu ${item.color} cho sản phẩm ${product.name}` });
      }

      const sizeEntry = variant.sizes.find(s => s.size === item.size);
      if (!sizeEntry) {
        return res.status(400).json({ message: `Không tìm thấy size ${item.size} cho sản phẩm ${product.name}` });
      }

      if (sizeEntry.stock < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm "${product.name}" màu ${item.color} size ${item.size} chỉ còn ${sizeEntry.stock} sản phẩm`
        });
      }

      sizeEntry.stock -= item.quantity;
      await product.save();
    }

    // Áp dụng voucher nếu có
    let finalTotal = totalAmount;
    let appliedVoucher = null;
    if (voucherCode) {
      const result = await applyVoucher(voucherCode, totalAmount);
      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }
      finalTotal = result.finalAmount;
      appliedVoucher = result.voucher;
    }

    const newOrder = new Order({
      userId: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount: finalTotal,
      voucher: appliedVoucher?._id || undefined
    });

    const savedOrder = await newOrder.save();

    // Tăng lượt sử dụng voucher
    if (appliedVoucher) {
      appliedVoucher.usedCount++;
      await appliedVoucher.save();
    }

    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: 'Tạo đơn hàng thất bại' });
  }
};

export const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shippingAddress, paymentMethod, voucherCode } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng trống' });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) return res.status(404).json({ message: 'Sản phẩm không tồn tại' });

      const variant = product.variants.find(v => v.color === item.color);
      if (!variant) return res.status(400).json({ message: `Không tìm thấy màu ${item.color}` });

      const sizeEntry = variant.sizes.find(s => s.size === item.size);
      if (!sizeEntry) return res.status(400).json({ message: `Không tìm thấy size ${item.size}` });

      if (sizeEntry.stock < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm "${product.name}" màu ${item.color} size ${item.size} chỉ còn ${sizeEntry.stock} sản phẩm`
        });
      }

      sizeEntry.stock -= item.quantity;

      const discountedPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));
      const subtotal = discountedPrice * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: discountedPrice
      });
    }

    // Áp dụng voucher nếu có
    let finalTotal = totalAmount;
    let appliedVoucher = null;
    if (voucherCode) {
      const result = await applyVoucher(voucherCode, totalAmount);
      if (!result.success) {
        return res.status(400).json({ message: result.message });
      }
      finalTotal = result.finalAmount;
      appliedVoucher = result.voucher;
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: 'unpaid',
      deliveryStatus: 'processing',
      totalAmount: finalTotal,
      voucher: appliedVoucher?._id || undefined
    });

    await Promise.all(orderItems.map(async item => {
      await Product.updateOne(
        {
          _id: item.productId,
          'variants.color': item.color,
          'variants.sizes.size': item.size
        },
        {
          $inc: { 'variants.$[v].sizes.$[s].stock': -item.quantity }
        },
        {
          arrayFilters: [
            { 'v.color': item.color },
            { 's.size': item.size }
          ]
        }
      );
    }));

    await Cart.deleteOne({ userId });

    if (appliedVoucher) {
      appliedVoucher.usedCount++;
      await appliedVoucher.save();
    }

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Không thể tạo đơn hàng' });
  }
};

// Get orders for logged in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách đơn hàng' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    // Chỉ admin hoặc chính chủ đơn hàng được xem
    if (!req.user.isAdmin && !order.userId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Không có quyền truy cập đơn hàng' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng' });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'username email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách đơn hàng' });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    order.deliveryStatus = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật trạng thái giao hàng thất bại' });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    order.paymentStatus = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Cập nhật trạng thái thanh toán thất bại' });
  }
};

// Optional: Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });

    res.json({ message: 'Đã xoá đơn hàng' });
  } catch (err) {
    res.status(500).json({ message: 'Xoá đơn hàng thất bại' });
  }
};
