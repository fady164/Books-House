const express = require("express");
const router = express.Router();
const {
  getStripe,
  getStripeByEmail,
  getStripeOrders,
  getStripeOrdersByEmail,
} = require("../controller/stripeData.contorller.js");

// PACKAGES
router.get("/getallpayments/packages", getStripe);
router.get("/getallpayments/packages/:email", getStripeByEmail);
// ORDERS
router.get("/getallpayments/orders", getStripeOrders);
router.get("/getallpayments/orders/:email", getStripeOrdersByEmail);

module.exports = router;
