const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  ValidateRegisterUser,
  ValidateLoginUser,
} = require("../models/User");

/**--------------------------
* @desc Register New User - Sign Up
* @route /api/auth/register
* @method POST
* @access public
-----------------------------*/
module.exports.registerUserContoller = asyncHandler(async (req, res) => {
  // 1. Validatation
  // 2. Is User already registered
  //  3. Hash The Password
  //  4. New User & save it to DB
  //  5. Send a response to the client

  // Validation
  const { error } = ValidateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Is User already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash The Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // New User & save it to DB
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();
  // Send a response to the client

  // TODO:--> Sending Email (Verify Account If Not Verified)

  res.status(201).json({ message: "Registerd Successfully..." });
});

/**--------------------------
* @desc Login User - Sign in
* @route /api/auth/login
* @method POST
* @access public
-----------------------------*/
module.exports.loginUserController = asyncHandler(async (req, res) => {
  // 1. Validation
  // 2. Is User Exist ?
  // 3. Check The Password
  // 4. Generate New Token (JWT)
  // 5. Response To The Client

  // STEP 1
  const { error } = ValidateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // STEP 2
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD!!" });
  }

  // STEP 3
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "INVALID EMAIL OR PASSWORD!!" });
  }

  // STEP 4
  // TODO:--> Sending Email (Verify Account If Not Verified)

  const token = user.generateAuthToken();

  // STEP 5
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});
