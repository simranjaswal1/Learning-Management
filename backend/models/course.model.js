import mongoose from "mongoose";

// Sub-schema for Lesson
const lessonSchema = new mongoose.Schema({
  lessonTitle: { type: String, required: true },
  lessonDescription: { type: String, required: true },
  videoUrl: { type: String, required: true }, // Video URL for the lesson
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz", // Reference to a Quiz model if you have one
  },
}, { _id: false });

// Sub-schema for Module
const moduleSchema = new mongoose.Schema({
  moduleTitle: { type: String, required: true },
  moduleDescription: { type: String },
  lessons: [lessonSchema]
}, { _id: false });

// Main Course Schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  modules: [moduleSchema], // Now uses modules instead of plain lessons
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;
