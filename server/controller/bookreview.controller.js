const BookReview = require("../models/bookreview");

//--------------------------add new book review

const addBookReview = async (req, res) => {
   try {
      const bookReviewData = req.body;
      const newbookreview = new BookReview(bookReviewData);
      await newbookreview.save();
      res.status(200).send(newbookreview);
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//----------------------------get book review by ID
const getBookReviewById = async (req, res) => {
   try {
      const bookreview = await BookReview.findOne({ _id: req.params.id });

      if (!bookreview) {
         return res.send(404).send("Cannot find Package !");
      }
      res.status(200).send(bookreview);
   } catch (e) {
      res.status(400).send(e.message);
   }
};

//----------------------------------get all book reviews data

const getAllBookRewiew = async (req, res) => {
   try {
      const bookreviews = await BookReview.find({});
      if (!bookreviews) {
         throw Error("there is no books reviews");
      }
      res.status(200).send(bookreviews);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

//----------------------------------delete  book review

const deleteBookReview = async (req, res) => {
   try {
      await BookReview.findOneAndDelete({ _id: req.params.id });

      res.status(200).send("deleted sucessfuly");
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//-------------------------------------update book review
const updateBookReview = async (req, res) => {
   try {
      const _id = req.params.id;
      const bookReview = await BookReview.findByIdAndUpdate({ _id }, req.body, {
         new: true,
         runvalidators: true,
      });
      if (!bookReview) {
         return res.status(404).send("no Book Review have this id");
      }
      res.status(200).send(bookReview);
   } catch (e) {
      res.status(500).send(e.message);
   }
};

module.exports = {
   addBookReview,
   getBookReviewById,
   getAllBookRewiew,
   deleteBookReview,
   updateBookReview,
};
