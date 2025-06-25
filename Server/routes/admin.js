const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminSignup,
  adminLogout,
  checkAuth,
} = require("../controllers/adminController");
const protectRoute = require("../middleware/protectRoute"); // Import the middleware

// Route for login
router.post("/login", adminLogin);

// Route for signup
router.post("/signup", adminSignup);
router.post("/logout", adminLogout);
router.get("/checkAuth", checkAuth);

// Protected route for admin dashboard
router.get("/admin/dashboard", protectRoute, (req, res) => {
  res.send("Welcome to the Admin Dashboard");
});

module.exports = router;
