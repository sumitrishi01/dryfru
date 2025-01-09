const express = require('express');
const { RegisterUser, LogginUser, LogoutUser, PasswordChangeRequest, verifyOtpForSignIn, Resend_Otp, GetMyDetails } = require('../controller/User.controller');
const { protect } = require('../middleware/auth');

const router = express.Router();


router.post('/regsiter-user',RegisterUser);
router.post('/verify-otp',verifyOtpForSignIn);
router.get('/resend-otp',Resend_Otp);
router.post('/login',LogginUser);
router.get('/logout',LogoutUser);
router.get('/my-details',protect,GetMyDetails);
router.post('/Password-Change-Request',protect,PasswordChangeRequest);









module.exports = router;