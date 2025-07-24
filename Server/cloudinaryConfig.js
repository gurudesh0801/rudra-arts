const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dquyimnmd", // Your Cloudinary Cloud Name
  api_key: "911627858167814", // Your Cloudinary API Key
  api_secret: "Ch7DFUjN4XBfg9ezH8oAQ-6Y-Co", // Your Cloudinary API Secret
});

module.exports = cloudinary;
