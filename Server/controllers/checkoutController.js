// controllers/checkoutController.js
import CheckoutStats from "../models/CheckoutStats.js";

// Increment checkout count
export const incrementCheckout = async (req, res) => {
  try {
    let stats = await CheckoutStats.findOne();
    if (!stats) {
      stats = new CheckoutStats({ totalCheckouts: 1 });
    } else {
      stats.totalCheckouts += 1;
    }

    await stats.save();
    res.status(200).json({
      message: "Checkout count incremented",
      total: stats.totalCheckouts,
    });
  } catch (err) {
    console.error("Error incrementing checkout:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get total checkout count
export const getCheckoutCount = async (req, res) => {
  try {
    const stats = await CheckoutStats.findOne();
    res.status(200).json({ total: stats?.totalCheckouts || 0 });
  } catch (err) {
    console.error("Error fetching checkout count:", err);
    res.status(500).json({ error: "Server error" });
  }
};
