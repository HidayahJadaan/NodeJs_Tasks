const asyncHandler = require('express-async-handler');

const getForgotPasswordView = asyncHandler ((req,res)=>{

    res.render('forgot-password');
});

module.exports = getForgotPasswordView;