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
