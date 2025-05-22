import express from 'express';
import {
  createQuizForStudents,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from '../controllers/quiz.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();

router.post('/', createQuizForStudents);
router.get('/', isAuthenticated, getAllQuizzes);
router.get('/:quizId', getQuizById);
router.delete('/:quizId', deleteQuiz);

//router.post('/submit', submitQuizAnswers);

// New routes for quiz results
//router.get('/results', getAllQuizResults);       // GET /api/quiz/results?userId=xxx&quizId=yyy
//router.get('/results/:resultId', getQuizResultById); // GET /api/quiz/results/:resultId

export default router;
