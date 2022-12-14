const express = require("express");
const router = express.Router();
const {
  addAuthorData,
  getAllAuthors,
  deleteAllAuthors,
  getAuthorByID,
} = require("../controller/author.controller");
const auth = require("../middelware/auth");

router.post("/addNewAuthor", addAuthorData);
router.get("/getall", auth, getAllAuthors);
// router.get('/:id',auth,getAuthorByID)
router.delete("/removeAll", auth, deleteAllAuthors);

module.exports = router;
