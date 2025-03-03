import express from "express";
import {
  submitQuiz,
  getKidPerformance,
  getAllKidsPerformance,
  getLeaderboard
} from "../controllers/performance.controller.js";  // ✅ Import named exports

import authMiddleware from "../middlewares/isAuthenticated.js"; // ✅ Authentication middleware

const router = express.Router();

// Kid: Submit quiz answers
router.post("/submit", authMiddleware, submitQuiz);

// Kid: Get their quiz performance
router.get("/my-performance", authMiddleware, getKidPerformance);

// Admin/Tutor: Get all kids' performance
router.get("/all-performance", authMiddleware, getAllKidsPerformance);

// Get leaderboard
router.get("/leaderboard", authMiddleware, getLeaderboard);

export default router;
