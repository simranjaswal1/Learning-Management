import mongoose from 'mongoose';

const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{ type: Number, required: true }],  // or appropriate type
  score: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('QuizResult', QuizResultSchema);
