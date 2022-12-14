const mongoose = require("mongoose");
const validator = require("validator");
const time = {
  timestamps: {
    currentTime: () => new Date().setHours(new Date().getHours() + 2),
  },
};
const stripeSchema = new mongoose.Schema(
  {
    package: {
      id: { type: String, required: true },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: String,
        required: true,
        trim: true,
      },
    },
    authorData: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      authorEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
          if (!validator.isEmail(value))
            throw new Error("Please enter valid email !!!");
        },
      },
      phoneNumber: {
        type: String,
        required: true,
        validate(value) {
          if (!validator.isMobilePhone(value))
            throw new Error("enter valid phone number");
        },
      },
      bookDocType: { type: Array, required: true },
      booksnumber: { type: String, required: true },
      comment: { type: String },
    },
  },

  time
);
const Stripe = mongoose.model("Stripe", stripeSchema);
exports.Stripe = Stripe;
