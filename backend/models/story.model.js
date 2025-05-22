// models/Story.js
import mongoose  from "mongoose";


const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Text content of the story
    required: true,
  },
  videoUrl: {
    type: String, // URL to the video (could be a YouTube URL, etc.)
    required: false, // Not every story needs a video
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model for teachers and students
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Story = mongoose.model('Story', storySchema);
export default Story;