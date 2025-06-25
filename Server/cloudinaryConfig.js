const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxpf6dhn1", // Your Cloudinary Cloud Name
  api_key: "258632391861317", // Your Cloudinary API Key
  api_secret: "eD8J4kz923jlcYPaRPEv9z_WvcQ", // Your Cloudinary API Secret
});

module.exports = cloudinary;
