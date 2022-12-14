const Book = require("../models/book");

//--------------------------add new book

const addBookData = async (req, res) => {
   try {
      const bookData = req.body;
      const newBook = new Book(bookData);
      await newBook.save();
      res.status(200).send(newBook);
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//----------------------------get book by ID
const getbookByID = async (req, res) => {
   try {
      const book = await Book.findOne({ _id: req.params.id });

      if (!book) {
         return res.send(404).send("Cannot find book !");
      }
      res.status(200).send(book);
   } catch (e) {
      res.status(400).send(e.message);
   }
};

//----------------------------------get all books data

const getAllBook = async (req, res) => {
   try {
      const book = await Book.find({});
      if (!book) {
         throw Error("there is no book");
      }
      res.status(200).send(book);
   } catch (error) {
      res.status(500).send(error.message);
   }
};

//----------------------------------delete all books

const deleteAllBook = async (req, res) => {
   try {
      await Book.deleteMany({});

      res.status(200).send("deleted sucessfuly");
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//----------------------------------delete  book

const deleteBook = async (req, res) => {
   try {
      await Book.findOneAndDelete({ _id: req.params.id });

      res.status(200).send("deleted sucessfuly");
   } catch (e) {
      res.status(500).send(e.message);
   }
};

//----------------------------------update book

// const updateBook = async (req, res) => {
//    try {
//       await Book.findByIdAndUpdate({ _id: req.params.id }, req.body);

//       res.status(200).send("updated sucessfuly");
//    } catch (e) {
//       res.status(500).send(e.message);
//    }
// };

const updateBook = async (req, res) => {
   try {
      const _id = req.params.id;
      const book = await Book.findByIdAndUpdate({ _id }, req.body, {
         new: true,
         runvalidators: true,
      });
      if (!book) {
         return res.status(404).send("no book have this id");
      }
      res.status(200).send(book);
   } catch (e) {
      console.log("error in update");
      res.status(500).send(e.message);
   }
};


//----------------------------------add a comment
const commentBook = async (req, res) => {
   const { id } = req.params;
   const {value} = req.body;
   const book = await Book.findById(id);

   book.comments.push(value);

   const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });

   res.json(updatedBook);
};

module.exports = {
   addBookData,
   getbookByID,
   getAllBook,
   deleteAllBook,
   deleteBook,
   updateBook,
   commentBook
};
