import Quiz from '../models/quiz.model.js';
import QuizResultModel from '../models/quizresult.model.js';

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user?.id; // from authentication middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: User ID missing' });
    }

    // Fetch quiz
   const quiz = await Quiz.findById(quizId); // CORRECT!

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Validate answers length
    if (!answers || answers.length !== quiz.questions.length) {
      return res.status(400).json({ success: false, message: "Incomplete answers provided" });
    }

    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) score++;
    });

    const percentage = (score / quiz.questions.length) * 100;

    // Save quiz result
    const quizResult = new QuizResultModel({
      userId,
      quizId,
      answers,
      score,
      percentage,
      submittedAt: new Date(),
    });
    await quizResult.save();

    res.status(201).json({
      success: true,
      message: "Quiz submitted successfully",
      resultId: quizResult._id,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
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

