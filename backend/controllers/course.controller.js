import mongoose from "mongoose";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    const createdBy = req.user.id; // Set via isAuthenticated middleware

    if (!title || !description || !Array.isArray(modules)) {
      return res.status(400).json({ message: "Title, description, and modules are required." });
    }

    const tutor = await User.findById(createdBy);
    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found." });
    }

    const newCourse = new Course({
      title,
      description,
      createdBy,
      assignedTo: [],
      modules,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully.", course: newCourse });
  } catch (error) {
    console.error("Create Course Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Enroll a student in a course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.assignedTo.includes(studentId)) {
      return res.status(200).json({ message: "Already enrolled." });
    }

    course.assignedTo.push(studentId);
    await course.save();

    res.status(200).json({ message: "Enrolled successfully.", course });
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get course details by ID
export const getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    const course = await Course.findById(courseId)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email")
      .populate("modules.lessons.quiz"); // Ensure models and references are correct

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Get Course Details Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all courses (optionally filter by tutor ID if needed)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("createdBy", "name email")
      .populate("assignedTo", "name email");

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found." });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Get All Courses Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// Delete course by ID (Only the creator can delete)
export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Optional: Allow only the creator to delete
    if (course.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this course." });
    }

    await course.deleteOne(); // or use await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
