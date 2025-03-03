import mongoose from "mongoose";
import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js";

// ✅ Create a new quiz (Only for Teachers)
export const createQuizForStudents = async (req, res) => {
  try {
    console.log("Request User:", req.user); // 🔍 Debugging

    // Ensure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
    }

    const { title, description, questions, assignedTo } = req.body;
    const teacherId = req.user.id;

    // Check if user is a teacher
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== "teacher") {
      return res.status(403).json({ success: false, message: "Only teachers can create quizzes" });
    }

    // Ensure assignedTo is an array; if not, wrap it in an array
    const assignedToArray = Array.isArray(assignedTo) ? assignedTo : [assignedTo];

    // Convert each ID in the array to a mongoose ObjectId using `new`
    const studentIds = assignedToArray.map(id => new mongoose.Types.ObjectId(id));
    console.log("Assigned Student IDs:", studentIds);

    // Validate that assigned students exist and have the role "kid"
    const students = await User.find({ _id: { $in: studentIds }, role: "kid" });
    console.log("Found Students:", students.map(s => s._id.toString()));

    if (students.length !== studentIds.length) {
      return res.status(400).json({ success: false, message: "Some assigned students do not exist" });
    }

    // Create quiz
    const quiz = new Quiz({
      title,
      description,
      questions,
      createdBy: teacherId,
      assignedTo: studentIds,
    });
    await quiz.save();

    res.status(201).json({ success: true, message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ success: false, message: "Error creating quiz", error: error.message });
  }
};


// ✅ Get quizzes assigned to a specific student (kid)
export const getStudentQuizzes = async (req, res) => {
  try {
    console.log("Request User:", req.user); // Debugging

    // Ensure req.user exists
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
    }

    const kidId = req.user.id;

    // Fetch quizzes where this kid is assigned
    const quizzes = await Quiz.find({ assignedTo: kidId }).populate("createdBy", "name email");
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ success: false, message: "Error fetching quizzes", error: error.message });
  }
};

// ✅ Get all quizzes (Accessible by Admins or Teachers)
export const getAllQuizzes = async (req, res) => {
  try {
    console.log("Request User:", req.user); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
    }

    // Optionally restrict access to admins and teachers
    if (req.user.role !== "admin" && req.user.role !== "teacher") {
      return res.status(403).json({ success: false, message: "Access denied: Only admins or teachers can view all quizzes" });
    }

    const quizzes = await Quiz.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    res.status(500).json({ success: false, message: "Error fetching all quizzes", error: error.message });
  }
};

// ✅ Get a single quiz by ID
export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    console.log("Fetching quiz with ID:", quizId); // Debugging

    const quiz = await Quiz.findById(quizId).populate("createdBy", "name email");
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ success: false, message: "Error fetching quiz", error: error.message });
  }
};

// ✅ Delete a quiz (Only for the teacher who created it)
export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    console.log("Deleting quiz with ID:", quizId); // Debugging

    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    // Only the teacher who created the quiz can delete it
    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Only the quiz creator can delete this quiz" });
    }

    await quiz.deleteOne();
    res.status(200).json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ success: false, message: "Error deleting quiz", error: error.message });
  }
};
