// routes/wish.route.js
import express from "express";
import {
  createWish,
  getWishesByUser,
  deleteWish,
} from "../controllers/wish.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createWish);
router.get("/", protect, getWishesByUser);
router.delete("/:productId", protect, deleteWish);

export default router;
