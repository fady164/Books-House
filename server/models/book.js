const mongoose = require("mongoose");

const time = {
   timestamps: {
      currentTime: () => new Date().setHours(new Date().getHours() + 2),
   },
};

const bookSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
      },
      author: {
         type: String,
         required: true,
      },
      category: {
         type: String,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
      bookDesc: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      imageSource: {
         type: String,
         required: true,
      },
      ourChoise: {
         type: Boolean,
         default: false,
      },
      comments: {
         type: [String],
         default: [],
      },
   },
   time
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
