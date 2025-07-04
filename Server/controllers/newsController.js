import News from "../models/News.js";
import cloudinary from "../cloudinaryConfig.js"; // assumes you're exporting configured instance
import streamifier from "streamifier";

// Cloudinary stream upload function
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Rudra-artss" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

// Add News controller
export const addNews = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const uploadResult = await streamUpload(req);

    const newNews = new News({
      title,
      description,
      image: uploadResult.secure_url,
      link,
    });

    await newNews.save();
    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (err) {
    console.error("Error adding news:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch all news controller
export const getAllNews = async (req, res) => {
  try {
    // Optional query parameters for pagination/sorting
    const { page = 1, limit = 10, sort = "-createdAt" } = req.query;

    const newsItems = await News.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await News.countDocuments();

    res.status(200).json({
      newsItems,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
    });
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Alternative simplified version without pagination
export const getAllNewsSimple = async (req, res) => {
  try {
    const newsItems = await News.find().sort("-createdAt");
    res.status(200).json(newsItems);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update News
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, link } = req.body;
    let updateData = { title, description, link };

    if (req.file) {
      const uploadResult = await streamUpload(req);
      updateData.image = uploadResult.secure_url;
    }

    const updated = await News.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: "News updated", news: updated });
  } catch (err) {
    console.error("Error updating news:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete News
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.status(200).json({ message: "News deleted" });
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Visible news only
export const getVisibleNews = async (req, res) => {
  try {
    const newsItems = await News.find({ isHide: false }).sort("-createdAt");
    res.status(200).json(newsItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// Hidden news only
export const getHiddenNews = async (req, res) => {
  try {
    const newsItems = await News.find({ isHide: true }).sort("-createdAt");
    res.status(200).json(newsItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const toggleHideNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    if (!news) return res.status(404).json({ error: "News not found" });

    news.isHide = !news.isHide;
    await news.save();

    res.status(200).json({
      message: `News has been ${news.isHide ? "hidden" : "unhidden"}`,
      news,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
