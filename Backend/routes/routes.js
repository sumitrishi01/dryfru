const express = require('express');
const { RegisterUser, LogginUser, LogoutUser, PasswordChangeRequest, verifyOtpForSignIn, Resend_Otp, GetMyDetails, getAllUsers } = require('../controller/User.controller');
const { protect } = require('../middleware/auth');
const { createProduct, getAllProducts, deleteProductById, getProductById, updateProduct } = require('../controller/Product.controller');
const multer = require("multer");
const { createOrderOfProduct, ChangeOrderStatus, getAllOrder } = require('../controller/Order_Controller');
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


//Admin user routes

router.get('/admin/get-users', getAllUsers);
router.post('/admin/change-order-status', ChangeOrderStatus);
router.get('/admin/get-all-order', getAllOrder);


// product Routes
router.post('/add-new-product', upload.any(), createProduct);
router.post('/update-product/:productId', upload.any(), updateProduct);
router.get('/get-product', getAllProducts);
router.get('/get-product/:id', getProductById);
router.delete('/delete-product/:id', deleteProductById);

// Order Routes
router.post('/add-order', createOrderOfProduct);








module.exports = router;