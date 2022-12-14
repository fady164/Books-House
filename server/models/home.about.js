const mongoose = require("mongoose");

const homeAboutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

const HomeAbout = mongoose.model("HomeAbout", homeAboutSchema);
module.exports = HomeAbout;
