const express = require("express");
const router = express.Router();
const { VerifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const 
{
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require ('./../controllers/bookController');
// =================================================================

// NO NEED FOR THIS WHEN WE ARE WORKING WITH MONGOOSE
// const books = [
//   {
//     id: 1,
//     title: "The Hobbit",
//     author: "Hidayah Jadaan",
//     description: "lorem ipsum dolor",
//     price: 77,
//     cover: "default1",
//   },

//   {
//     id: 2,
//     title: "The Hobbit 2",
//     author: "Hidayah Jadaan 2",
//     description: "lorem ipsum dolor 2",
//     price: 27,
//     cover: "default2",
//   },
//   {
//     id: 3,
//     title: "The Hobbit 3",
//     author: "Hidayah Jadaan 3",
//     description: "lorem ipsum dolor 3",
//     price: 71,
//     cover: "default3",
//   },
// ];

// ROUTES HANDLERS
// =================================================================
// router.get("/", getAllBooks);
// router.get("/:id", getBook);
// router.post("/", VerifyTokenAndAuthorization, createBook);
// router.put("/:id", VerifyTokenAndAuthorization, updateBook);
// router.delete("/:id", VerifyTokenAndAuthorization, deleteBook);
// =================================================================

// Another Way For Writing ROUTES HANDLERS
// =================================================================
// --> /api/books
router.route('/').get(getAllBooks).post(VerifyTokenAndAuthorization,createBook);
// --> /api/books/:id
router.route('/:id').get(getBook).put(VerifyTokenAndAuthorization,updateBook).delete(VerifyTokenAndAuthorization,deleteBook);
// =================================================================


module.exports = router;
