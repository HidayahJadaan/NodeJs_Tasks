const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
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
const register = asyncHandler( async(req,res)=>{

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
    });
    // SAVE IT TO THE DATABASE
    const userCreated = await newUser.save();
// Don't Send Password To the User
// const token = null; ===> without JWT

// USING JWT
const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);
const {password, ...other} = userCreated._doc;

    res.status(201).json({...other, token});
});


// =================================================================
/*
@desc Login user
@method POST
@route api/auth/login
@access public
*/
const login = asyncHandler( async(req,res)=>{

    // VALIDATION
    const {error} = validateLoginUser(req.body);
    if(error){
        return res.status(400).json({error:error.details[0].message});
    }

    let user = await User.findOne({email: req.body.email});
// CHECKING Credientals From User's Email
    if(!user){
        return res.status(400).json({error:'INVALID EMAIL OR PASSWORD'});
    }
// PASSWORD MATCHING
   const isPasswordsMatch = await bcrypt.compare(req.body.password, user.password);

   if(!isPasswordsMatch){
    return res.status(400).json({error:'INVALID EMAIL OR PASSWORD'});
   }


// Don't Send Password To the User
// const token = null; ===> without JWT

// USING JWT
const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);
const {password, ...other} = user._doc;

    res.status(201).json({...other, token});
});

module.exports = {
    register,
    login
}