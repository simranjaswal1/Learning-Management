import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const contentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  contentType: { type: String, enum: ["video", "article", "interactive"], required: true },
  url: { type: String }, // For media links (optional)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // List of users who liked
  views: { type: Number, default: 0 },
  comments: [commentSchema], // Array of comment objects
});

export default mongoose.model("Content", contentSchema);
