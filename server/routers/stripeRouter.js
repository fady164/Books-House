const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  getConfig,
  createPayment,
  postData,
  postWebHookPackages,
} = require("../controller/stripeRouter.controller");

// Replace if using a different env file or config

router.get("/config", getConfig);
router.post("/data", postData);

router.post("/create-payment-intent", createPayment);

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  postWebHookPackages
);

module.exports = router;
