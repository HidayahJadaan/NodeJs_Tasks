const mongoose = require('mongoose');
const Joi = require('joi');

// Comment Schema

const CommentSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Types.ObjectId,
        ref:"POST",
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    text:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
    },
}, { timestamps:true});


// Comment Model
const Comment = mongoose.model("Comment", CommentSchema);

// Validate Create Comment
function validateCreateComment(obj){
    const schema = Joi.object({
        postId: Joi.string().required().label("POST ID"),
        text: Joi.string().trim().required().label("TEXT"),
    });

    return schema.validate(obj);
}

// Validate Update Comment

function validateUpdateComment(obj){
    const schema = Joi.object({
        text: Joi.string().trim().required(),
    });

    return schema.validate(obj);
}


module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment
}