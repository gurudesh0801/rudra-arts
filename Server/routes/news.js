import express from "express";
import {
  addNews,
  getAllNews,
  getAllNewsSimple,
  updateNews,
  deleteNews,
  getVisibleNews,
  getHiddenNews,
  toggleHideNews,
} from "../controllers/newsController.js";
import multer from "multer";
import streamifier from "streamifier";

const router = express.Router();

// Multer config to store in memory for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
router.post("/add", upload.single("image"), addNews);
router.get("/", getAllNews);
router.get("/all", getAllNewsSimple);
router.put("/update/:id", upload.single("image"), updateNews);
router.delete("/delete/:id", deleteNews);
router.put("/hide-toggle/:id", toggleHideNews);
router.get("/visible", getVisibleNews);
router.get("/hidden", getHiddenNews);

export default router;
