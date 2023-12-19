const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser
} = require('../models/User');

// =================================================================
/*
@desc Register new user
@method POST
@route api/auth/register
@access public
*/
router.post('/register', asyncHandler( async(req,res)=>{

    // VALIDATION
    const {error} = validateRegisterUser(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }

    let user = await User.findOne({email: req.body.email});
// EMAIL CHECKING
    if(user){
        return res.status(400).json({error:'Email already registered'});
    }
// HASHING PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

// NOT EXISTS --> Register it
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });
    // SAVE IT TO THE DATABASE
    const userCreated = await newUser.save();
// Don't Send Password To the User
const token = null;
const {password, ...other} = userCreated._doc;

    res.status(201).json({...other, token});
}));

// =================================================================

module.exports = router;