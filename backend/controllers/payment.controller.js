import { VNPay, ignoreLogger, ProductCode, VnpLocale } from "vnpay";
import dayjs from "dayjs";
import { createOrderUnified } from "./order.controller.js";
import TempOrder from "../models/tempOrder.model.js";
import qs from "qs";
import crypto from "crypto";

export const createPayment = async (req, res) => {
  const { totalAmount, orderInfo } = req.body;
  const vnpay = new VNPay({
    tmnCode: process.env.VNPAY_TMN_CODE,
    secureSecret: process.env.VNPAY_SECRET_KEY,
    vnpayHost: "https://sandbox.vnpayment.vn",
    testMode: true,
    loggerFn: ignoreLogger,
  });
  const txnRef = Date.now().toString();
  await TempOrder.create({
    txnRef,
    userId: req.user._id,
    fromCart: req.body.fromCart,
    productId: req.body.productId,
    color: req.body.color,
    size: req.body.size,
    quantity: req.body.quantity,
    shippingAddress: req.body.shippingAddress,
    paymentMethod: req.body.paymentMethod,
    voucherCode: req.body.voucherCode,
    totalAmount: req.body.totalAmount,
    paymentStatus: "unpaid",
  });

  const vnpayResponse = await vnpay.buildPaymentUrl({
    vnp_Amount: totalAmount,
    vnp_TxnRef: txnRef, // dùng đúng mã vừa lưu
    vnp_IpAddr: "127.0.0.1",
    vnp_Locale: VnpLocale.VN,
    vnp_OrderInfo: orderInfo || "Thanh toán đơn hàng",
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: "http://localhost:5173/payment-return",
    vnp_CreateDate: dayjs().format("YYYYMMDDHHmmss"),
    vnp_ExpireDate: dayjs().add(30, "minute").format("YYYYMMDDHHmmss"),
  });
  res.status(200).json(vnpayResponse);
};

export const checkPaymentVNPAY = async (req, res) => {
  try {
    let vnp_Params = { ...req.query };
    const secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    // 🔑 Sort các key theo chuẩn VNPAY
    vnp_Params = Object.keys(vnp_Params)
      .sort()
      .reduce((acc, key) => {
        acc[key] = vnp_Params[key];
        return acc;
      }, {});

    const signData = qs.stringify(vnp_Params, {
      encode: true,
      format: "RFC1738",
    });
    const hmac = crypto.createHmac("sha512", process.env.VNPAY_SECRET_KEY);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    if (secureHash !== signed) {
      return res.status(400).json({ message: "Invalid signature" });
    }
    if (req.query.vnp_ResponseCode === "00") {
      const txnRef = req.query.vnp_TxnRef;
      const tempOrder = await TempOrder.findOne({ txnRef });
      if (!tempOrder) {
        return res.status(400).json({ message: "Không tìm thấy đơn hàng tạm" });
      }

      req.body = { ...tempOrder.toObject(), paymentStatus: "paid" };
      req.user = { _id: tempOrder.userId }; 
      await createOrderUnified(req, res);

      await TempOrder.deleteOne({ txnRef });
    } else {
      res.status(400).json({ message: "Payment failed", data: req.query });
    }
  } catch (err) {
    console.error("checkPaymentVNPAY error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
