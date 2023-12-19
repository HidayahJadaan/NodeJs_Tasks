const mongoose = require('mongoose');

// BOOK SCHEMA
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cover:{
        type: String,
        required: true,
        enum:['Soft Cover', 'Hard Cover']
    }
},
{timestamps: true}
);

// BOOK MODEL
const Book = mongoose.model('Book', bookSchema);
// VALIDATE CREATE BOOK ==> POST
function ValidateBook(REQOBJECT) {
    const schema = joi.object({
      title: joi.string().min(3).max(200).required(),
      author: joi.string().required(),
      description: joi.string().required(),
      price: joi.number().min(0).required(),
      cover: joi.string().required,
    });
    return schema.validate(REQOBJECT);
  }
  // =================================================================
  // VALIDATE UPDATE BOOK ==> PUT
  function ValidateUpdateBook(REQOBJECT) {
    const schema = joi.object({
      title: joi.string().min(3).max(200),
      author: joi.string(),
      description: joi.string(),
      price: joi.number().min(0),
      cover: joi.string(),
    });
    return err = schema.validate(REQOBJECT);
  }
  
module.exports = {
    Book,
    ValidateBook,
    ValidateUpdateBook,
};