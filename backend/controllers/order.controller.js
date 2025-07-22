import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Voucher from "../models/voucher.model.js";
import { sendOrder } from "../utils/mailer.js";
import User from "../models/user.model.js";
// Create order
export const createOrderUnified = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fromCart,
      productId,
      color,
      size,
      quantity, // dùng khi mua trực tiếp
      shippingAddress,
      paymentMethod,
      voucherCode,
      totalAmount,
    } = req.body;

    const orderItems = [];
    const user = await User.findById(userId);

    // --- Mua từ giỏ hàng ---
    if (fromCart) {
      const cart = await Cart.findOne({ userId });
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Giỏ hàng trống" });
      }

      for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (!product)
          return res.status(404).json({ message: "Sản phẩm không tồn tại" });

        const variant = product.variants.find((v) => v.color === item.color);
        const sizeEntry = variant?.sizes.find((s) => s.size === item.size);
        if (!variant || !sizeEntry)
          return res
            .status(400)
            .json({ message: "Thông tin sản phẩm không hợp lệ" });

        if (sizeEntry.stock < item.quantity) {
          return res.status(400).json({
            message: `Sản phẩm "${product.name}" màu ${item.color} size ${item.size} chỉ còn ${sizeEntry.stock} sản phẩm`,
          });
        }

        orderItems.push({
          productId: product._id,
          name: product.name,
          image: product.images[0].url,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: product.discount ? product.discount : product.price,
        });
      }
    }

    // --- Mua trực tiếp 1 sản phẩm ---
    else {
      if (!productId || !color || !size || !quantity) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin sản phẩm để đặt hàng" });
      }

      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });

      const variant = product.variants.find((v) => v.color === color);
      const sizeEntry = variant?.sizes.find((s) => s.size === size);
      if (!variant || !sizeEntry) {
        return res
          .status(400)
          .json({ message: "Thông tin biến thể không hợp lệ" });
      }

      if (sizeEntry.stock < quantity) {
        return res.status(400).json({
          message: `Sản phẩm "${product.name}" màu ${color} size ${size} chỉ còn ${sizeEntry.stock} sản phẩm`,
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        image: product.images[0].url,
        color,
        size,
        quantity,
        price: product.discount ? product.discount : product.price,
      });

      sizeEntry.stock -= quantity;
      await product.save();
    }

    // --- Tìm voucher nếu có ---
    let appliedVoucher = null;
    if (voucherCode) {
      appliedVoucher = await Voucher.findOne({ code: voucherCode });
      if (appliedVoucher) {
        appliedVoucher.usedCount++;
        await appliedVoucher.save();
      }
    }

    // --- Tạo đơn hàng ---
    const order = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "unpaid",
      deliveryStatus: "processing",
      totalAmount,
      voucher: appliedVoucher?._id || undefined,
    });

    // --- Trừ tồn kho ---
    await Promise.all(
      orderItems.map(async (item) => {
        await Product.updateOne(
          {
            _id: item.productId,
            "variants.color": item.color,
            "variants.sizes.size": item.size,
          },
          {
            $inc: { "variants.$[v].sizes.$[s].stock": -item.quantity },
          },
          {
            arrayFilters: [{ "v.color": item.color }, { "s.size": item.size }],
          }
        );
      })
    );

    // --- Xoá giỏ hàng nếu từ cart ---
    if (fromCart) {
      await Cart.deleteOne({ userId });
    }
    sendOrder(user.email, order);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Không thể tạo đơn hàng" });
  }
};

// Get orders for logged in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy danh sách đơn hàng" });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("voucher");
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    // Chỉ admin hoặc chính chủ đơn hàng được xem
    if (!req.user.role === "admin" && !order.userId.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Không có quyền truy cập đơn hàng" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy đơn hàng" });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Không thể lấy danh sách đơn hàng" });
  }
};

// Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  console.log(req.body);

  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    order.deliveryStatus = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Cập nhật trạng thái giao hàng thất bại" });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    order.paymentStatus = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cập nhật trạng thái thanh toán thất bại" });
  }
};

// Optional: Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    res.json({ message: "Đã xoá đơn hàng" });
  } catch (err) {
    res.status(500).json({ message: "Xoá đơn hàng thất bại" });
  }
};
