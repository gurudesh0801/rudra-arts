const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true, // Assuming each product_id is unique
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_image: {
      type: [String],
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_size: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_discount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
); // Optional: Adds createdAt and updatedAt

module.exports = mongoose.model("Product", productSchema);
