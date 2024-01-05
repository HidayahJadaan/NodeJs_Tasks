const router = require('express').Router();
const {registerUserContoller, loginUserController} = require('../controllers/authController')

//  api/auth/register
router.post('/register', registerUserContoller);
//  api/auth/login
router.post('/login', loginUserController);


module.exports = router; 