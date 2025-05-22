import express from 'express';
import { getAllQuizzesWithUserScores } from '../controllers/quizresult.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/user-quizzes', isAuthenticated, getAllQuizzesWithUserScores);

export default router;
