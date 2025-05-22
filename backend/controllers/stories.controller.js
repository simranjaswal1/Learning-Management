// controllers/storyController.js
import Story from "../models/story.model.js";
//import User from "../models/user.model.js";

// Create Story (Teachers only)
export const createStory = async (req, res) => {
  try {
    // Ensure user is authenticated and user._id is available
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User not authenticated' });
    }

    console.log('Authenticated User:', req.user); // Log the authenticated user

    const { title, content, videoUrl } = req.body;

    // Validate inputs
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newStory = new Story({
      title,
      content,
      videoUrl,
      author: req.user.id, // Make sure author is set correctly
    });

    console.log('Story to be saved:', newStory); // Log the story object

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Error creating story:', error); // Log error for better debugging
    res.status(500).json({ message: 'Error creating story', error });
  }
};
// Get All Stories (For both Teachers and Students)
export const getStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate('author', 'username')  // populate the author's username
      .populate('likes', 'username');  // populate liked students

    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
};


// Delete Story (Teachers only)
export const deleteStory = async (req, res) => {
  try {
    // Check if the user is a teacher
    if (req.user.role !== 'teacher') {
      return res.status(403).json({ message: 'Only teachers can delete stories' });
    }

    const { storyId } = req.params;
    const story = await Story.findByIdAndDelete(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story', error });
  }
};

// Like Story (Students only)
/*export const likeStory = async (req, res) => {
  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can like stories' });
    }

    const { storyId } = req.params;
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Add the student to the likes array
    if (!story.likes.includes(req.user._id)) {
      story.likes.push(req.user._id);
      await story.save();
      return res.status(200).json({ message: 'Story liked', story });
    }

    return res.status(400).json({ message: 'You have already liked this story' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking story', error });
  }
};
*/
