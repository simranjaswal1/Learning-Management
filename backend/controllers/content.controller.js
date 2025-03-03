import Content from "../models/content.model.js";

// ✅ Create new content
export const createContent = async (req, res) => {
  try {
    const { title, description, contentType, url } = req.body;
    const newContent = new Content({
      title,
      description,
      contentType,
      url,
      createdBy: req.id, // Get from authentication middleware
    });

    await newContent.save();
    res.status(201).json({ message: "Content created successfully", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Error creating content", error });
  }
};

// ✅ Get all content
export const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find().populate("createdBy", "name email");
    res.status(200).json(contents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching content", error });
  }
};

// ✅ Get single content by ID (also increases views)
export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id).populate("createdBy", "name email");
    if (!content) return res.status(404).json({ message: "Content not found" });

    content.views += 1;
    await content.save();

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Error fetching content", error });
  }
};

// ✅ Update content
export const updateContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ message: "Content updated", content });
  } catch (error) {
    res.status(500).json({ message: "Error updating content", error });
  }
};

// ✅ Delete content
export const deleteContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting content", error });
  }
};

// ✅ Like content
export const likeContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    if (content.likes.includes(req.id)) {
      content.likes = content.likes.filter((userId) => userId.toString() !== req.id);
      await content.save();
      return res.status(200).json({ message: "Like removed" });
    } else {
      content.likes.push(req.id);
      await content.save();
      return res.status(200).json({ message: "Content liked" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error liking content", error });
  }
};

// ✅ Add comment
export const addComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    content.comments.push({ user: req.id, text: req.body.text });
    await content.save();

    res.status(201).json({ message: "Comment added", content });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// ✅ Delete comment
export const deleteComment = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: "Content not found" });

    content.comments = content.comments.filter(
      (comment) => comment._id.toString() !== req.body.commentId
    );
    await content.save();

    res.status(200).json({ message: "Comment deleted", content });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};
