import express from "express";
import { createCourse, enrollInCourse, getCourseDetails,getAllCourses ,deleteCourse} from "../controllers/course.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

// Routes for courses
router.post("/create", isAuthenticated, createCourse); // Cre//ate a new course
router.post("/enroll", isAuthenticated, enrollInCourse); // Enroll in a course
router.get("/:courseId", isAuthenticated, getCourseDetails); // Get details of a course
router.get("/", isAuthenticated, getAllCourses); // Get all courses by tutor
router.delete('/:courseId', isAuthenticated, deleteCourse);

  
  
export default router;
