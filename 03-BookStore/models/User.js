const mongoose = require('mongoose');
const Joi = require('joi');

// USER SCHEMA
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim : true,
    },
    email: {
        type: String,
        required: true,
        trim : true,
        unique: true,
        minlength:5,
        maxlength:100
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
}, {timestamps: true}); 

// USER MODEL
const User = mongoose.model('User', UserSchema);
// VALIDATION

function validateRegisterUser(obj){

    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).max(20).required(),
    });
    return schema.validate(obj);
}

function validateLoginUser(obj){

    const schema = Joi.object({
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(8).max(20).required(),
    });
    return schema.validate(obj);
}


function validateUpdateUser(obj){

    const schema = Joi.object({
        username: Joi.string().min(3).max(20),
        email: Joi.string().min(5).max(100).email(),
        password: Joi.string().min(8).max(20),
    });
    return schema.validate(obj);
}
module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
};