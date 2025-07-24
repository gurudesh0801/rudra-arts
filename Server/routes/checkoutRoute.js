// routes/checkoutRoute.js
import express from "express";
import {
  incrementCheckout,
  getCheckoutCount,
} from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/increment", incrementCheckout);
router.get("/count", getCheckoutCount);

export default router;
