const mongoose = require("mongoose");

const homeSliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  imageSrc: { type: String, required: true },
});

const HomeSlider = mongoose.model("HomeSlider", homeSliderSchema);
module.exports = HomeSlider;
