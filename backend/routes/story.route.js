// routes/storyRoutes.js

import express from "express";
const router = express.Router();
import {createStory,getStories,deleteStory } from "../controllers/stories.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

// Route for creating a story (Teachers only)
router.post('/add', isAuthenticated,createStory);

// Route for viewing stories (For both Teachers and Students)
router.get('/stories', isAuthenticated,getStories);

// Route for deleting a story (Teachers only)
router.delete('/stories/:storyId',isAuthenticated,deleteStory);

// Route for liking a story (Students only)
//router.post('/stories/:storyId/like', isAuthenticated,likeStory);

export default router;
