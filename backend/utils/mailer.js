import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendOrder(email, order) {
  const orderDate = new Date(order.createdAt).toLocaleDateString("vi-VN");
  const orderItemsHtml = order.items
    .map(
      (item) => `
      <div style="display: flex; gap: 10px; margin-bottom: 10px;">
        <img src="${
          item.image
        }" width="64" height="64" style="border-radius: 4px;" />
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Màu: ${item.color} | Size: ${item.size}</p>
          <p>Số lượng: ${item.quantity}</p>
          <p>${item.price.toLocaleString("vi-VN")} VNĐ</p>
        </div>
      </div>
    `
    )
    .join("");

  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    headers: {
      "X-Mailbox-Owner": email,
    },
    subject: "ToaFashion: Đơn hàng của bạn đã được xác nhận",
    html: `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #388e3c; text-align: center;">Xác nhận đơn hàng của bạn!</h2>
        <p style="text-align: center; color: #4a5568;">
          Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được xác nhận và sẽ sớm được vận chuyển.
        </p>
        <hr/>
        <h3>Chi tiết đơn hàng</h3>
        <p><strong>Mã đơn hàng:</strong> #${order._id}</p>
        <p><strong>Ngày đặt hàng:</strong> ${orderDate}</p>
        <p><strong>Tổng cộng:</strong> ${order.totalAmount.toLocaleString(
          "vi-VN"
        )} VNĐ</p>
        <h3>Địa chỉ giao hàng</h3>
        <p>${order.shippingAddress?.fullName || ""}</p>
        <p>${order.shippingAddress?.street || ""}, ${order.shippingAddress?.ward || ""}, ${order.shippingAddress?.district || ""}, ${order.shippingAddress?.city || ""}</p>
        <p>Điện thoại: ${order.shippingAddress?.phone || ""}</p>
        <p>Ghi chú: ${order.shippingAddress?.note || ""}</p>
        <hr/>
        <h3>Các mặt hàng đã đặt</h3>
        ${orderItemsHtml}
        <hr/>
        <p style="text-align: right; font-weight: bold;">Tổng cộng: ${order.totalAmount.toLocaleString(
          "vi-VN"
        )} VNĐ</p>
        <p style="font-size: 12px; color: #718096; text-align: center; margin-top: 20px;">
          Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi tại 
          <a href="mailto:support@example.com" style="color: #3182ce;">support@example.com</a>.
        </p>
      </div>
      `,
  });
}
