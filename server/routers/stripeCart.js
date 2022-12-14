const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  postStripeCart,
  postWebHook,
} = require("../controller/stripeCart.controller");

// const { Order } = require("../models/Order");

router.post("/create-checkout-session", postStripeCart);

//webhook new code
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  postWebHook
);

module.exports = router;
