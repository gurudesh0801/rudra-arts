const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../controllers/productsController");
const Product = require("../models/Products");

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create
router.post(
  "/add",
  upload.array("pimages", 10),
  productController.createProduct
);

// Read
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Read single
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// fetch by category
router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({
      product_category: category,
    });
    if (products.length === 0) {
      return res.status(404).json({ error: "No products in this category" });
    }
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

// Update
// Add upload middleware
router.put("/:id", upload.single("pimage"), async (req, res) => {
  const { pname, pid, pprice, pdescription, psize, pcategory, pdiscount } =
    req.body;

  let pimage = req.body.pimage;

  // If file was uploaded, use its buffer/base64 (or save to disk/Cloudinary here)
  if (req.file) {
    // Example: base64 encoding (not ideal for prod)
    const imageBuffer = req.file.buffer;
    const base64Image = `data:${
      req.file.mimetype
    };base64,${imageBuffer.toString("base64")}`;
    pimage = base64Image;

    // Or: Upload to Cloudinary using cloudinary.uploader.upload_stream()
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        product_name: pname,
        product_id: pid,
        product_price: pprice,
        product_image: Array.isArray(pimage) ? pimage : [pimage],
        product_description: pdescription,
        product_size: psize,
        product_category: pcategory,
        product_discount: pdiscount || 0, // ← here
      },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// WhatsApp share
// Add this new route in your backend
router.get("/bulk/whatsapp-message", async (req, res) => {
  try {
    const { productIds } = req.query;
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ message: "Product IDs are required" });
    }

    // Fetch all products
    const products = await Product.find({ _id: { $in: productIds } });
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Calculate total price
    const totalPrice = products.reduce((sum, p) => sum + p.product_price, 0);

    // Build the message
    let message = "Hi! I'm interested in the following products:\n\n";

    products.forEach((p, index) => {
      message += `Product ${index + 1}:
 ID: ${p.product_id}
 Name: ${p.product_name}
 Description: ${p.product_description}
 Size: ${p.product_size}
 Price: ₹${p.product_price}
 Category: ${p.product_category}\n\n`;
    });

    message += `Total Items: ${products.length}\n`;
    message += `Total Price: ₹${totalPrice}`;

    const whatsappURL = `https://wa.me/918668494090?text=${encodeURIComponent(
      message
    )}`;

    res.json({ message, whatsappURL });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// WhatsApp share (keep only this one)
router.get("/bulk/whatsapp-message", async (req, res) => {
  try {
    const productIds = JSON.parse(req.query.productIds);

    // Validate input
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: "Invalid product IDs" });
    }

    // Fetch products from database
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }

    // Format WhatsApp message
    const message = formatBulkWhatsAppMessage(products);
    const phoneNumber = process.env.WHATSAPP_NUMBER; // Your business number
    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/918668494090?text=${encodedMessage}`;

    res.json({ whatsappURL });
  } catch (error) {
    console.error("Error generating WhatsApp URL:", error);
    res.status(500).json({ error: "Failed to generate WhatsApp URL" });
  }
});

function formatBulkWhatsAppMessage(products) {
  const total = products.reduce(
    (sum, product) => sum + product.product_price,
    0
  );

  let message = `Hello! I want to purchase these items:\n\n`;

  products.forEach((product, index) => {
    message += `${index + 1}. ${product.product_name}, ${
      product.product_size
    } - ${formatPrice(product.product_price)}\n`;
  });

  message += `\nTotal: ${formatPrice(total)}\n`;
  message += `\nPlease confirm availability and proceed with payment.`;

  return message;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

// Add this new route
router.patch("/:id/stock", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { inStock: req.body.inStock },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
