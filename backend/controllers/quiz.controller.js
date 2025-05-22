import QuizModel from '../models/quiz.model.js';
import QuizResultModel from '../models/quizresult.model.js'; // Assuming you have this model for submissions
import Performance from '../models/performance.model.js';
// Create a new quiz
export const createQuizForStudents = async (req, res) => {
  try {
    const quizData = req.body;
    const newQuiz = await QuizModel.create(quizData);
    res.status(201).json({ success: true, quiz: newQuiz });
  } catch (error) {
    console.error('Create quiz error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const userId = req.user._id;  // from isAuthenticated middleware

    const quizzes = await QuizModel.find();

    const quizzesWithTopScore = await Promise.all(
      quizzes.map(async (quiz) => {
        const topPerformance = await Performance.findOne({
          kidId: userId,
          quizId: quiz._id,
        })
          .sort({ score: -1 })
          .lean();

        return {
          ...quiz.toObject(),
          topScore: topPerformance ? topPerformance.score : null,
        };
      })
    );

    res.status(200).json({ success: true, quizzes: quizzesWithTopScore });
  } catch (error) {
    console.error('Get all quizzes error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error('Get quiz by ID error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete quiz by ID
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const deleted = await QuizModel.findByIdAndDelete(quizId);
    if (!deleted) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.status(200).json({ success: true, message: "Quiz deleted" });
  } catch (error) {
    console.error('Delete quiz error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
/*
// Submit quiz answers
export const submitQuizAnswers = async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    // 1. Fetch quiz to get correct answers
    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: 'Quiz not found' });

    // 2. Calculate score (assumes quiz.questions[i].correctAnswer exists)
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] !== undefined && answers[index] === question.correctAnswer) {
        score++;
      }
    });

    // Optional: Calculate percentage or other metrics
    const percentage = (score / quiz.questions.length) * 100;

    // 3. Save result with score
    const result = await QuizResultModel.create({
      userId,
      quizId,
      answers,
      score,
      percentage,
      submittedAt: new Date()
    });

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error('Submit quiz answers error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllQuizResults = async (req, res) => {
  try {
    const { userId, quizId } = req.query;  // Optional filters
    const filter = {};
    if (userId) filter.userId = userId;
    if (quizId) filter.quizId = quizId;

    const results = await QuizResultModel.find(filter)
      .populate('userId', 'name email')   // optional user info
      .populate('quizId', 'title description'); // optional quiz info

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error('Get all quiz results error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get quiz result by ID
export const getQuizResultById = async (req, res) => {
  try {
    const { resultId } = req.params;
    const result = await QuizResultModel.findById(resultId)
      .populate('userId', 'name email')
      .populate('quizId', 'title description');
    if (!result) return res.status(404).json({ success: false, message: 'Quiz result not found' });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Get quiz result by ID error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
*/