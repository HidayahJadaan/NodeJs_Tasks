const joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Book, ValidateBook, ValidateUpdateBook } = require("./../models/Book");
// =================================================================
/*
@desc Get All Books
@method GET
@route /api/books
@access public
*/
const getAllBooks = asyncHandler(async(req, res) => {
    const books = await Book.find();
    // const books = await Book.find({price: 10});
    res.status(200).json(books);
  });
// =================================================================
/*
@desc GET certain Book
@method GET
@route /api/books/:id
@access public
*/
 const getBook =  asyncHandler( async (req, res) => {
    // const book = books.find((book) => book.id === parseInt(req.params.id));
    const book = await Book.findById(req.params.id);
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
@access public --> private
*/
const createBook = asyncHandler( async (req, res) => {
    const { err } = ValidateBook(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }
  
    // const newBook = {
    //   title: req.body.title,
    //   author: req.body.author,
    //   description: req.body.description,
    //   price: req.body.price,
    // };
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
  
    const NewBook = await newBook.save();
  
    // books.push(newBook);
    // 201 --> Creatred Successfully
    res.status(201).json(NewBook);
  });
// =================================================================
/*
@desc Update Certain book
@method PUT
@route /api/books/:id
@access public --> private
*/
  const updateBook =  asyncHandler( async(req, res) => {
    const { err } = ValidateUpdateBook(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }
  
    // const book = books.find((book) => book.id === parseInt(req.params.id));
    const book = await Book.findByIdAndUpdate(
      req.params.id,
  
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      { new: true }
    );
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
@access public --> private
*/

 const deleteBook =  asyncHandler( async(req, res) => {
    // const book = books.find((book) => book.id === parseInt(req.params.id));
    const book =await  Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.status(200).json({
        message: "Book Deleted Successfully",
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });

  module.exports={
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
  }