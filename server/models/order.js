const { string } = require("joi");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        imageSource: { type: String },
        title: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

exports.Order = Order;
