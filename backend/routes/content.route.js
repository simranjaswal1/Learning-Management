import express from "express";
import {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  likeContent,
  addComment,
  deleteComment,
} from "../controllers/content.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Create new content
router.post("/create", isAuthenticated, createContent);

// ✅ Fetch all content
router.get("/list", getAllContent);

// ✅ Fetch content by ID (increments view count)
router.get("/view/:id", getContentById);

// ✅ Update content
router.put("/update/:id", isAuthenticated, updateContent);

// ✅ Delete content
router.delete("/remove/:id", isAuthenticated, deleteContent);

// ✅ Like/unlike content
router.post("/like/:id", isAuthenticated, likeContent);

// ✅ Add comment
router.post("/comment/add/:id", isAuthenticated, addComment);

// ✅ Delete comment
router.delete("/comment/remove/:id", isAuthenticated, deleteComment);

export default router;
