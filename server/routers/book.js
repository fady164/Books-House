const express = require("express");
const router = express.Router();
const {
   addBookData,
   getAllBook,
   deleteAllBook,
   getbookByID,
   deleteBook,
   updateBook,
   commentBook,
} = require("../controller/book.contorller");
const uploadImage = require("../services/multer.services");
const auth = require("../middelware/auth");

router.get("/book/getall", getAllBook);
router.post("/book/addnewbook", addBookData);
router.get("/book/:id", getbookByID);
router.delete("/book/remove/:id", deleteBook);
router.delete("/book/removeAll", deleteAllBook);
router.put("/book/updateBook/:id", updateBook);
router.post("/book/:id/commentBook", commentBook);

module.exports = router;
