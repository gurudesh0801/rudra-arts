const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "rudra-secret-key";

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  try {
    // Step 1: Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(401).json({ error: "Invalid username or password" });

    // Step 2: Compare the password using bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid username or password" });

    // Step 3: Generate a JWT token
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });

    // Step 4: Set the token in a secure, HttpOnly cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false, // fine for localhost...
      sameSite: "Lax", // works in most cases locally without HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Step 5: Respond with a success message
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.adminSignup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    // Generate JWT token
    const token = jwt.sign({ id: newAdmin._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token in HTTP-only cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// In your backend (Express)
exports.adminLogout = (req, res) => {
  try {
    // Clear the adminToken cookie by setting it to an expired date
    res.clearCookie("adminToken", { path: "/" });

    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.checkAuth = (req, res) => {
  const token = req.cookies?.adminToken;
  console.log("This is token", token);

  if (!token) {
    return res
      .status(401)
      .json({ authenticated: false, message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.status(200).json({
      authenticated: true,
      userId: decoded.id,
    });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({
      authenticated: false,
      message: "Invalid or expired token",
    });
  }
};
