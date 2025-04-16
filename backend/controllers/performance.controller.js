import Performance from "../models/performance.model.js";
import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js";

// ✅ Kid submits quiz answers & performance is evaluated
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const kidId = req.user.id; // Extract user ID from authentication middleware

    // Fetch the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    // Validate answers length
    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({ success: false, message: "Incomplete answers provided" });
    }

    // Evaluate Score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        score += 1; // Increase score if correct
      }
    });

    // Store performance record
    const performance = new Performance({
      kidId,
      quizId,
      score,
      completedAt: new Date(),
    });
    await performance.save();

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error submitting quiz", error: error.message });
  }
};

// ✅ Get kid's quiz performance
export const getKidPerformance = async (req, res) => {
  try {
    const kidId = req.user.id; // Extract user ID

    // Fetch performance history of the kid
    const performance = await Performance.find({ kidId }).populate("quizId", "title");

    res.status(200).json({ success: true, performance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching performance", error: error.message });
  }
};

// ✅ Get performance of all kids (For Tutors/Admins)
export const getAllKidsPerformance = async (req, res) => {
  try {
    const performance = await Performance.find()
      .populate("kidId", "name")
      .populate("quizId", "title");

    res.status(200).json({ success: true, performance });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching all performance records", error: error.message });
  }
};

// ✅ Get leaderboard (Top performing kids)
export const getLeaderboard = async (req, res) => {
  try {
    // Aggregate total scores for each kid
    const leaderboard = await Performance.aggregate([
      {
        $group: {
          _id: "$kidId",
          totalScore: { $sum: "$score" },
          quizCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "kidDetails",
        },
      },
      { $unwind: "$kidDetails" },
      {
        $project: {
          _id: 0,
          kidId: "$kidDetails._id",
          name: "$kidDetails.name",
          totalScore: 1,
          quizCount: 1,
        },
      },
      { $sort: { totalScore: -1 } }, // Sort by highest score
    ]);

    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching leaderboard", error: error.message });
  }
};
