import express from "express";
import { getMonthlyRevenue, getOrderStatusStats, getDailyOrderStats, getProductCategoryRatio } from "../controllers/chart.controller.js";

const router = express.Router();

router.get("/statistics/revenue", getMonthlyRevenue);
router.get("/statistics/order-status", getOrderStatusStats); 
router.get("/statistics/daily-orders", getDailyOrderStats);
router.get('/statistics/product-category-ratio', getProductCategoryRatio);



export default router;
