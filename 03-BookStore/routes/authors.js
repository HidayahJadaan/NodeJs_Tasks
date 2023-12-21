const express = require("express");
const router = express.Router();
const { VerifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require("../controllers/authorsControllers");

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

router.get("/",getAllAuthors);

router.get("/:id", getAuthor);

router.post("/", VerifyTokenAndAuthorization, createAuthor);

router.put("/:id", VerifyTokenAndAuthorization, updateAuthor);


router.delete("/:id", VerifyTokenAndAuthorization, deleteAuthor);
// =================================================================

module.exports = router;
