import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Tutor
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctOption: { type: Number, required: true }, // Index of correct answer
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
