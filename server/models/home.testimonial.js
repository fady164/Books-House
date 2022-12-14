const mongoose = require("mongoose");

const homeTestimonialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

const HomeTestimonial = mongoose.model(
  "HomeTestimonial",
  homeTestimonialSchema
);
module.exports = HomeTestimonial;
