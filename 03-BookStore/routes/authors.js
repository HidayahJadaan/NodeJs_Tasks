const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { VerifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const {
  Author,
  ValidateAuthor,
  ValidateUpdateAuthor,
} = require("./../models/Authors");
// =================================================================

// const authors = [
//   {
//     id: 1,
//     firstName: "Hidayah",
//     lastName: "Jadaan",
//     nationality: "Jordanian",
//     image: "default-image.jpg",
//   },

//   {
//     id: 2,
//     firstName: "Ahmad",
//     lastName: "Jadaan",
//     nationality: "Jordanian",
//     image: "default-image.jpg",
//   },
//   {
//     id: 3,
//     firstName: "Mohammed",
//     lastName: "Jadaan",
//     nationality: "Jordanian",
//     image: "default-image.jpg",
//   },
// ];

// ROUTES HANDLERS
// =================================================================
/*
@desc Get All authors
@method GET
@route /api/authors
@access public
*/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const AuthorsList = await Author.find();
    // FILTERING
    // const AuthorsList = await Author.find().sort({firstNAme:1});
    // const AuthorsList = await Author.find().sort({firstNAme:1}).select("firstName lastName -_id");

    res.status(200).json(AuthorsList);

  })
);
// =================================================================
/*
@desc GET certain author
@method GET
@route /api/authors/:id
@access public
*/
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    res.status(200).json(author);
   
  })
);
// =================================================================
/*
@desc Create a new Book
@method POST
@route /api/authors/:id
@access public --> Private
*/
router.post("/", VerifyTokenAndAuthorization,asyncHandler( async (req, res) => {
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
}));
// =================================================================
/*
@desc Update Certain book
@method PUT
@route /api/authors/:id
@access public --> private
*/
router.put("/:id", VerifyTokenAndAuthorization,asyncHandler( async (req, res) => {
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
}));

// =================================================================
/*
@desc Delete Certain book
@method DELETE
@route /api/authors/:id
@access public --> private
*/
router.delete("/:id", VerifyTokenAndAuthorization,asyncHandler( async(req, res) => {
  // const author = authors.find((author) => author.id === parseInt(req.params.id));
  const author = await Author.findByIdAndDelete(req.params.id);
  if (author) {
    res.status(200).json({
      message: "Author Deleted Successfully",
    });
  } else {
    res.status(404).json({ message: "Author not found" });
  }
}));
// =================================================================

module.exports = router;
