const express = require('express');
const { RegisterUser, LogginUser, LogoutUser, PasswordChangeRequest, verifyOtpForSignIn, Resend_Otp, GetMyDetails } = require('../controller/User.controller');
const { protect } = require('../middleware/auth');
const { createProduct, getAllProducts, deleteProductById } = require('../controller/Product.controller');
const multer = require("multer");
const storage = multer.memoryStorage()

const upload = multer({ storage });

const router = express.Router();

// Register Routes
router.post('/regsiter-user', RegisterUser);
router.post('/verify-otp', verifyOtpForSignIn);
router.get('/resend-otp', Resend_Otp);
router.post('/login', LogginUser);
router.get('/logout', LogoutUser);
router.get('/my-details', protect, GetMyDetails);
router.post('/Password-Change-Request', protect, PasswordChangeRequest);

// Register Routes
router.post('/add-new-product', upload.any(), createProduct);
router.get('/get-product', getAllProducts);
router.delete('/delete-product/:id', deleteProductById);









module.exports = router;