import mongoose from "mongoose";
import addressSchema from "./address.model.js";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    color: String,
    size: String,
    quantity: Number,
    price: Number,
    image: String,
  },
  { _id: false }
);

const shippingAddressSchema = addressSchema;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      enum: ["COD", "PayPal", "VNPAY"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    deliveryStatus: {
      type: String,
      enum: ["processing", "shipping", "delivered", "cancelled"],
      default: "processing",
    },
    totalAmount: { type: Number, required: true },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
