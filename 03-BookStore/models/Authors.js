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
  lastName: {
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
});

authorSchema.set("timestamps", true);

// CREATING AUTHOR MODEL
const Author = mongoose.model("Author", authorSchema);

// VALIDATE CREATE Author ==> POST
function ValidateAuthor(REQOBJECT) {
  const schema = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    nationality: joi.string().required(),
    image: joi.string().required(),
  });
  return schema.validate(REQOBJECT);
}
// =================================================================
// VALIDATE UPDATE Author ==> PUT
function ValidateUpdateAuthor(REQOBJECT) {
  const schema = joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    nationality: joi.string(),
    image: joi.string().min(0),
  });
  return (err = schema.validate(REQOBJECT));
}

module.exports = {
  Author,
  ValidateAuthor,
  ValidateUpdateAuthor,
};
