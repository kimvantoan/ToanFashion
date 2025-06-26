import Voucher from '../models/voucher.model.js';

export const createVoucher = async (req, res) => {
  try {
    const voucher = new Voucher(req.body);
    await voucher.save();
    res.status(201).json(voucher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getVoucherById = async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
    res.json(voucher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVoucher = async (req, res) => {
  try {
    const updated = await Voucher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllVouchers = async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (err) {
    res.status(500).json({ message: 'Không thể lấy danh sách voucher' });
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    const deleted = await Voucher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy mã giảm giá' });
    res.json({ message: 'Đã xoá mã giảm giá' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};