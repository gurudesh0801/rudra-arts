import express from "express";
import multer from "multer";
import {
  getAllBlogs,
  addBlog, // existing admin add
  requestBlog, // new user submit
  approveBlog,
  rejectBlog,
  getPendingBlogs,
} from "../controllers/blogController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🧑‍💻 User
router.post("/submit", upload.single("image"), requestBlog);

// ✅ Admin
router.get("/all", getAllBlogs);
router.post("/add", upload.single("image"), addBlog); // existing
router.get("/pending", getPendingBlogs);
router.put("/approve/:id", approveBlog);
router.put("/reject/:id", rejectBlog);

export default router;
