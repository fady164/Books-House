const mongoose = require("mongoose");

const time = {
   timestamps: {
      currentTime: () => new Date().setHours(new Date().getHours() + 2),
   },
};

const packageSchema = mongoose.Schema({
   packageName: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
   },
   packageDesc: [
      {
         type: String,
         required: true,
         trim: true,
      },
   ],
   packagePrice: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
   },
   reviewsNumber: {
      type: Number,
      required: true,
      trim: true,
      // unique: true,
   },
});

const Packages = mongoose.model("packages", packageSchema);

module.exports = Packages;
