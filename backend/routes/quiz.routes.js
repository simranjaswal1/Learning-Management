import express from "express";
import {
  createQuizForStudents,
  getStudentQuizzes,
  getAllQuizzes,
  getQuizById,
  deleteQuiz,
} from "../controllers/quiz.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Route for teachers to create a new quiz
router.post("/createquiz", isAuthenticated, createQuizForStudents);

// Route for kids to fetch their assigned quizzes
router.get("/student/quiz", isAuthenticated, getStudentQuizzes);

// Route for admins or teachers to fetch all quizzes
router.get("/allquiz", isAuthenticated, getAllQuizzes);

// Route to get a single quiz by its ID
router.get("/quiz/:quizId", isAuthenticated, getQuizById);

// Route for teachers to delete a quiz they created
router.delete("/delete/:quizId", isAuthenticated, deleteQuiz);

export default router;
