import Order from "../models/order.model.js";
export const getMonthlyRevenue = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const revenue = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
            $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
          },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $cond: [
              { $lt: ["$_id", 10] },
              { $concat: ["0", { $toString: "$_id" }] },
              { $toString: "$_id" },
            ],
          },
          total: 1,
        },
      },
      { $sort: { month: 1 } },
    ]);

    const fullYearData = Array.from({ length: 12 }, (_, i) => {
      const month = (i + 1).toString().padStart(2, "0");
      const found = revenue.find((r) => r.month === month);
      return {
        month,
        total: found ? found.total : 0,
      };
    });

    res.json(fullYearData);
  } catch (error) {
    console.error("Revenue error:", error);
    res.status(500).json({ message: "Không thể tính doanh thu theo tháng." });
  }
};

export const getOrderStatusStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$deliveryStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = stats.map((item) => ({
      status: item._id,
      count: item.count,
    }));

    res.json(result);
  } catch (error) {
    console.error("Order status stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import dayjs from "dayjs";
export const getDailyOrderStats = async (req, res) => {
  try {
    const today = dayjs().endOf("day").toDate();
    const last7Days = dayjs().subtract(6, "day").startOf("day").toDate();

    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days, $lte: today }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Ensure all 7 days are included
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = dayjs().subtract(i, "day").format("YYYY-MM-DD");
      const found = stats.find((s) => s._id === date);
      result.push({ date, totalOrders: found?.totalOrders || 0 });
    }

    res.json(result);
  } catch (err) {
    console.error("Error in getDailyOrderStats:", err);
    res.status(500).json({ error: "Lỗi khi lấy thống kê đơn hàng theo ngày." });
  }
};

import Product from '../models/product.model.js';

export const getProductCategoryRatio = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'categories', // collection name trong MongoDB (viết thường, số nhiều)
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo',
        },
      },
      {
        $unwind: '$categoryInfo',
      },
      {
        $project: {
          _id: 0,
          category: '$categoryInfo.name',
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error('❌ getProductCategoryRatio error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

