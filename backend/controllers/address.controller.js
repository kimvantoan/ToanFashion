import User from '../models/user.model.js';
// [GET] /api/users/addresses
export const getAddresses = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.addresses);
};

// [POST] /api/users/addresses
export const addAddress = async (req, res) => {
  console.log(req.body);
  
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json(user.addresses);
};

// [PUT] /api/users/addresses/:addressId
export const updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const user = await User.findById(req.user._id);
  const address = user.addresses.id(addressId);
  if (!address) return res.status(404).json({ message: 'Địa chỉ không tồn tại' });

  Object.assign(address, req.body);
  await user.save();
  res.json(user.addresses);
};

// [DELETE] /api/users/addresses/:addressId
export const deleteAddress = async (req, res) => {
  console.log(req.params);
  
  const { addressId } = req.params;
  const user = await User.findById(req.user._id);
  const address = user.addresses.id(addressId);
  if (!address) return res.status(404).json({ message: 'Địa chỉ không tồn tại' });

  user.addresses.pull(address);
  await user.save();
  res.json(user.addresses);
};
