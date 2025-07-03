import Wish from "../models/wish.model.js";

// Tạo mới wish
export const createWish = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  try {
    let wish = await Wish.findOne({ userId });

    if (wish) {
      // Đã có wishlist, thêm sản phẩm nếu chưa có
      if (!wish.products.includes(productId)) {
        wish.products.push(productId);
        await wish.save();
      }
    } else {
      wish = await Wish.create({ userId, products: [productId] });
    }
    // Populate sản phẩm nếu cần
    await wish.populate('products');

    res.status(200).json({
      message: "Wish created/updated successfully",
      wish,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getWishesByUser = async (req, res) => {
 const userId = req.user._id;
  try {
    const wish = await Wish.findOne({ userId }).populate("products");
    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa wish
export const deleteWish = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const updatedWish = await Wish.findOneAndUpdate(
      { userId },
      { $pull: { products: productId } },
      { new: true }
    );

    if (!updatedWish) {
      return res.status(404).json({ message: "Wish not found" });
    }

    res.status(200).json({ message: "Product removed from wish list" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

