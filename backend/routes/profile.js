import express from "express";
import User from "../models/user.model.js";
import Quiz from "../models/quiz.model.js";
import Performance from "../models/performance.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/me", isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "teacher") {
      const quizzes = await Quiz.find({ creator: userId });
      return res.json({ user, quizzes });
    } else if (user.role === "kid") {
      const performances = await Performance.find({ studentId: userId }).populate("quizId", "title");
      return res.json({ user, performances });
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (err) {
    console.error("Error in profile route:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
