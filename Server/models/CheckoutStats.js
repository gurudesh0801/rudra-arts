// models/CheckoutStats.js
import mongoose from "mongoose";

const checkoutStatsSchema = new mongoose.Schema(
  {
    totalCheckouts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CheckoutStats = mongoose.model("CheckoutStats", checkoutStatsSchema);
export default CheckoutStats;
