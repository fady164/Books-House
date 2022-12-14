const mongoose = require("mongoose");

const time = {
  timestamps: {
    currentTime: () => new Date().setHours(new Date().getHours() + 2),
  },
};

const bookreviewSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    reviwer: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
    publisher: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageSrc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  time
);

const BookReview = mongoose.model("bookReview", bookreviewSchema);

module.exports = BookReview;
