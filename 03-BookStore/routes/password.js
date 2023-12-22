const express = require('express');
const getForgotPasswordView = require('../controllers/PasswordController');
const router = express.Router();

// =================================================================
/*
@desc Get forgot-password view
@method GET
@route /password/forgot-password
@access public
*/

router.route('/forgot-password').get(getForgotPasswordView);

module.exports = router;