import mongoose from "mongoose";

const tempOrderSchema = new mongoose.Schema(
  {
    txnRef: { type: String, required: true, unique: true },
    // Các trường cần thiết cho đơn hàng
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fromCart: { type: Boolean, default: false }, // thêm trường này để phân biệt mua trực tiếp hay từ giỏ hàng
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // dùng khi mua trực tiếp
    color: String,
    size: String,
    quantity: Number, // dùng khi mua trực tiếp
    items: Array, // dùng khi mua từ giỏ hàng
    shippingAddress: Object,
    paymentMethod: { type: String, enum: ["COD", "PayPal", "VNPAY"], default: "COD" },
    voucherCode: String,
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("TempOrder", tempOrderSchema);