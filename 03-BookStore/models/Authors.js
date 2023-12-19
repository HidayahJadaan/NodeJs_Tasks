const mongoose = require("mongoose");

// CONNECTING TO THE DATABSE
mongoose
  .connect("mongodb://localhost:27017/BookStoreDB")
  .then(() => console.log("Connected to MongoDB--- BookStroeDB"))
  .catch((err) =>
    console.log("Could not Connect To MongoDB -- BookStoreDB", err.message)
  );

// CREATING AUTHOR SCHEMA
const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lasName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "avator.png",
  },
  timestamp: true,
});
// CREATING AUTHOR MODEL
const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
