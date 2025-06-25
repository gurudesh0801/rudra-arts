const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose.connect("mongodb://127.0.0.1:27017/rudraarts").then(async () => {
  const hashedPassword = await bcrypt.hash("1234", 10);
  const admin = new Admin({ username: "admin", password: hashedPassword });
  await admin.save();
  console.log("Admin created");
  mongoose.disconnect();
});
