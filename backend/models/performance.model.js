import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
  kidId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  score: { type: Number, required: true },
  completedAt: { type: Date, default: Date.now },
});

const Performance = mongoose.model("Performance", performanceSchema);
export default Performance;
