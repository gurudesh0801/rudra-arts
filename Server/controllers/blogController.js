import Blog from "../models/Blog.js";
import cloudinary from "../cloudinaryConfig.js";
import streamifier from "streamifier";

const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "Rudra-artss" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

export const getAllBlogs = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && status !== "All" ? { status } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// For admin to directly add a blog without review process
export const addBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const result = await streamUpload(req);

    const blog = new Blog({
      title,
      content,
      author,
      image: result.secure_url,
      status: "approved", // Directly approved
    });

    await blog.save();
    res.status(201).json({ message: "Blog added successfully", blog });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// User-submitted blog for approval
export const requestBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image is required" });

    const result = await streamUpload(req);

    const blog = new Blog({
      title,
      content,
      author,
      image: result.secure_url,
      status: "pending",
    });

    await blog.save();
    res.status(201).json({ message: "Blog submitted for review", blog });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// Admin: Approve blog
export const approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog approved", blog });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// Admin: Reject blog
export const rejectBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    res.json({ message: "Blog rejected", blog });
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// Admin: Get pending blogs
export const getPendingBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
