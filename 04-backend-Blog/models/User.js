const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
// User Schema

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
  }
);
// =============================
// Populate Posts That Belongs To This User When he/she Get his/her Profile

userSchema.virtual('posts',{
  ref:"POST",
  foreignField:"user",
  localField:"_id"
});


// =============================
// GENRATE AUTH TOKEN

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET)
}

// =============================
//  User Model
const User = mongoose.model("User", userSchema);

// Validate Register User
// =============================
function ValidateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}


// Validate Login User
// =============================
function ValidateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}


// Validate Update User
// =============================
function ValidateUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().min(2).max(100),
    password: Joi.string().trim().min(8).required(),
    bio: Joi.string(),
  
  });
  return schema.validate(obj);
}

// =======================
module.exports = {
  User,
  ValidateRegisterUser,
  ValidateLoginUser,
  ValidateUpdateUser
};
