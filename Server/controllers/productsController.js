const Product = require("../models/Products");
const cloudinary = require("../cloudinaryConfig");
const streamifier = require("streamifier");

exports.createProduct = async (req, res) => {
  const { pname, pid, pprice, pdescription, psize, pcategory, pdiscount } =
    req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "At least one image is required." });
  }

  try {
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Rudra-artss" },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    // Upload all images to Cloudinary
    const imageUploadPromises = req.files.map((file) =>
      streamUpload(file.buffer)
    );
    const uploadedImageUrls = await Promise.all(imageUploadPromises);

    const newProduct = new Product({
      product_name: pname,
      product_id: pid,
      product_price: pprice,
      product_image: uploadedImageUrls,
      product_description: pdescription,
      product_size: psize,
      product_category: pcategory,
      product_discount: pdiscount || 0,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (err) {
    console.error("Product creation failed:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};
