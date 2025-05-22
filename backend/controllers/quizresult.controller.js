import Quiz from '../models/quiz.model.js';
import QuizResult from '../models/quizresult.model.js';  // Your schema here

export const getAllQuizzesWithUserScores = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User ID missing' });
    }

    const quizzes = await Quiz.find({});

    const quizzesWithScores = await Promise.all(
      quizzes.map(async (quiz) => {
        const bestResult = await QuizResult.findOne({ userId, quizId: quiz._id })
          .sort({ score: -1 })
          .lean();

        return {
          ...quiz.toObject(),
          userResult: bestResult ? {
            score: bestResult.score,
            percentage: bestResult.percentage,
            submittedAt: bestResult.submittedAt,
          } : null,
        };
      })
    );

    res.status(200).json({ success: true, quizzes: quizzesWithScores });
  } catch (error) {
    console.error('Get all quizzes error:', error);
    res.status(500).json({ success: false, message: 'Error fetching quizzes', error: error.message });
  }
};
