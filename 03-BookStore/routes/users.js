const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const {verifyToken} = require("../middlewares/verifyToken");
const asyncHandler = require("express-async-handler");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../models/User");

// =================================================================
/*
@desc Update user
@method PUT
@route api/users/:id
@access private
*/

router.put("/:id", verifyToken, asyncHandler(async (req, res) => {
    // // AUTHORIZATION CHECKING ...
    if (req.user.id !== req.params.id) {
      // 403 --> Forbidden
      return res.status(403).json({ error: "Unauthorized Access!!, You only can update your data" });
    }

    // VALIDATION
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // // HASHING THE PASSWORD
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
    }

    // UPDATING USER
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  })
);
module.exports = router;
