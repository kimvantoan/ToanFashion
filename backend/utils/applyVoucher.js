import Voucher from '../models/voucher.model.js';

export const applyVoucher = async (code, originalAmount) => {
  const voucher = await Voucher.findOne({ code, active: true });

  if (!voucher) {
    return { success: false, message: 'Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa' };
  }

  const now = new Date();
  if (voucher.startDate && voucher.startDate > now) {
    return { success: false, message: 'Mã giảm giá chưa bắt đầu có hiệu lực' };
  }

  if (voucher.endDate && voucher.endDate < now) {
    return { success: false, message: 'Mã giảm giá đã hết hạn' };
  }

  if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
    return { success: false, message: 'Mã giảm giá đã được sử dụng hết' };
  }

  if (voucher.minOrderValue && originalAmount < voucher.minOrderValue) {
    return {
      success: false,
      message: `Đơn hàng phải có giá trị tối thiểu ${voucher.minOrderValue.toLocaleString()}đ để sử dụng mã này`
    };
  }

  let discount = 0;
  if (voucher.discountType === 'percent') {
    discount = (originalAmount * voucher.discountValue) / 100;
    if (voucher.maxDiscount) {
      discount = Math.min(discount, voucher.maxDiscount);
    }
  } else if (voucher.discountType === 'fixed') {
    discount = voucher.discountValue;
  }

  const finalAmount = Math.max(0, originalAmount - discount);

  return {
    success: true,
    finalAmount,
    discount,
    voucher
  };
};
