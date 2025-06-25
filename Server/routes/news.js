import express from "express";
import { addNews } from "../controllers/newsController.js";
import multer from "multer";
import streamifier from "streamifier";

const router = express.Router();

// Multer config to store in memory for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
router.post("/add", upload.single("image"), addNews);

export default router;
