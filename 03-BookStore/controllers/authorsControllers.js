const asyncHandler = require("express-async-handler");

const {
  Author,
  ValidateAuthor,
  ValidateUpdateAuthor,
} = require("./../models/Authors");
// =================================================================
/*
@desc Get All authors
@method GET
@route /api/authors
@access public
*/
const getAllAuthors = 
asyncHandler(async (req, res) => {
  const AuthorsList = await Author.find();
  // FILTERING
  // const AuthorsList = await Author.find().sort({firstNAme:1});
  // const AuthorsList = await Author.find().sort({firstNAme:1}).select("firstName lastName -_id");

  res.status(200).json(AuthorsList);

});

// =================================================================
/*
@desc GET certain author
@method GET
@route /api/authors/:id
@access public
*/
const getAuthor = asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    res.status(200).json(author);
   
  });

// =================================================================
/*
@desc Create a new Author
@method POST
@route /api/authors/:id
@access public --> Private
*/
  const createAuthor = asyncHandler( async (req, res) => {
    const { err } = ValidateAuthor(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }
  
      const newAuthor = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      });
      const result = await newAuthor.save();
      res.status(201).json(result);
  
    
  
    // =================================================================
    // BEFORE DATABSE
    // authors.push(newAuthor);
    // 201 --> Creatred Successfully
    // res.status(201).json(newAuthor);
  });

// =================================================================
/*
@desc Update Certain Author
@method PUT
@route /api/authors/:id
@access public --> private
*/
  const updateAuthor = asyncHandler( async (req, res) => {
    const { err } = ValidateUpdateAuthor(req.body);
    if (err) {
      return res.status(400).json({ message: err.details[0].message });
    }
      const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
          },
        },
        { new: true }
      );
  
    // BEFORE DATABASE
    // const author = authors.find((author) => author.id === parseInt(req.params.id));
    // if (author) {
    //   res.status(200).json({
    //     message: "Author's Data Updated Successfully",
    //   });
    // } else {
    //   res.status(404).json({ message: "Author not found" });
    // }
  });

// =================================================================
/*
@desc Delete Certain Author
@method DELETE
@route /api/authors/:id
@access public --> private
*/
  const deleteAuthor = asyncHandler( async(req, res) => {
    // const author = authors.find((author) => author.id === parseInt(req.params.id));
    const author = await Author.findByIdAndDelete(req.params.id);
    if (author) {
      res.status(200).json({
        message: "Author Deleted Successfully",
      });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  });

  module.exports = {
    getAllAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  };