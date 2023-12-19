const express = require("express");
const router = express.Router();
const joi = require("joi");


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
/*
@desc Get All Books
@method GET
@route /api/books
@access public
*/
router.get("/", (req, res) => {
  res.status(200).json(books);
});
// =================================================================
/*
@desc GET certain Book
@method GET
@route /api/books/:id
@access public
*/
router.get("/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    // return value is null
    res.status(404).json({ message: "Book not found" });
  }
});
// =================================================================
/*
@desc Create a new Book
@method POST
@route /api/books/:id
@access public
*/
router.post("/", (req, res) => {
  const { err } = ValidateBook(req.body);
  if (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const newBook = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
  };

  books.push(newBook);
  // 201 --> Creatred Successfully
  res.status(201).json(newBook);
});
// =================================================================
/*
@desc Update Certain book
@method PUT
@route /api/books/:id
@access public
*/
router.put("/:id", (req, res) => {
  const { err } = ValidateUpdateBook(req.body);
  if (err) {
    return res.status(400).json({ message: err.details[0].message });
  }

  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({
      message: "Book Updated Successfully",
    });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// =================================================================
/*
@desc Delete Certain book
@method DELETE
@route /api/books/:id
@access public
*/
router.delete("/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({
      message: "Book Deleted Successfully",
    });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
// =================================================================

module.exports = router;
