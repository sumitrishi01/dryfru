const User = require("../models/User.model");
const EmailQueue = require("../queues/email");
const sendToken = require("../utils/sendToken")

exports.RegisterUser = async (req, res) => {
    try {
        const { Name, Email, Password, ContactNumber, Role = "User" } = req.body;
        const emptyFields = [];


        if (!Name) emptyFields.push('Name');
        if (!Email) emptyFields.push('Email');
        if (!ContactNumber) emptyFields.push('Contact Number');
        if (!Password || Password.length < 6) emptyFields.push('Password (must be at least 6 characters)');

        // If there are empty fields, send a response with the missing fields
        if (emptyFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Please fill in the following required fields: ${emptyFields.join(', ')}`,
            });
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(Email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.',
            });
        }

        // Validate phone number format
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(ContactNumber)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid 10-digit phone number.',
            });
        }

        // Check if user already exists by email
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            if (!existingUser.isMobileVerified) {
                return res.status(400).json({
                    success: false,
                    message: 'An account already exists with this email. Please verify your email or reset your password if you forgot it.',
                });
            }
        }

        // Check if user already exists by phone number
        const existingUserByContact = await User.findOne({ ContactNumber });
        if (existingUserByContact) {
            if (!existingUserByContact.isMobileVerified) {
                const Generate_otp = Math.floor(100000 + Math.random() * 900000);
                const ExpireTimeOfOtp = new Date()
                ExpireTimeOfOtp.setMinutes(ExpireTimeOfOtp.getMinutes() + 2);
                existingUserByContact.OtpForVerification = Generate_otp;
                existingUserByContact.OtpGeneratedAt = ExpireTimeOfOtp;
                await EmailQueue.add({ user_id: existingUserByContact._id, mail_type: 'resendRegisterOtp', otp: Generate_otp });
                return res.status(200).json({
                    success: true,
                    message: 'A verification OTP has been sent to your registered email address.',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'It seems that this contact number and email address are already registered. Please log in or reset your password.',
                });
            }
        }

        // If no existing user, create a new user
        const ExpireTimeOfOtpRegister = new Date()
        ExpireTimeOfOtpRegister.setMinutes(ExpireTimeOfOtpRegister.getMinutes() + 2);
        const Generate_otp = Math.floor(100000 + Math.random() * 900000);
        const newUser = new User({
            Name,
            Email,
            Password,
            ContactNumber,
            Role,
            OtpGeneratedAt: ExpireTimeOfOtpRegister,
            OtpForVerification: Generate_otp,
        });

        // Save the new user to the database
        await newUser.save();

        // Send OTP to the user's email
        await EmailQueue.add({ user_id: newUser._id, mail_type: 'register', otp: Generate_otp });

        return res.status(200).json({
            success: true,
            message: 'Registration successful. Please check your email for a verification OTP.',
            data: newUser,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};
exports.verifyOtpForSignIn = async (req, res) => {
    try {
        const { email, otp, type = "register" } = req.body;


        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address.',
            });
        }

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid OTP.',
            });
        }

        const existingUserByMail = await User.findOne({ Email: email });

        if (!existingUserByMail) {
            return res.status(404).json({
                success: false,
                message: 'User not found with this email address. Please check or register.',
            });
        }


        if (type === 'register') {

            if (existingUserByMail.isActive && existingUserByMail.isMobileVerified) {
                return res.status(400).json({
                    success: false,
                    message: 'Your account is already verified. You can log in.',
                });
            }

            // Check if OTP matches and user is inactive
            if (existingUserByMail.OtpForVerification === otp && !existingUserByMail.isMobileVerified) {
                existingUserByMail.isActive = true;
                await existingUserByMail.save();


                await sendToken(existingUserByMail, res, 201, "Your account has been successfully verified")
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                });
            }
        }

        // Handle password reset verification
        if (type === 'password_reset') {
            if (existingUserByMail.passwordOtp === otp) {
                existingUserByMail.password = existingUserByMail.tempPassword;
                existingUserByMail.tempPassword = undefined;

                await existingUserByMail.save();

                return res.status(200).json({
                    success: true,
                    message: 'Your password has been successfully reset. You can now log in with your new password.',
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                });
            }
        }

 

    } catch (error) {
        console.error('Error during OTP verification:', error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
};
exports.Resend_Otp = async (req, res) => {
    try {
        const { email, type = "register" } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                msg: "Please provide a valid email address."
            });
        }

        const user = await User.findOne({ Email: email });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No user found with this email address."
            });
        }


        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        user.OtpForVerification = otp;

        if (type === "register") {

            await EmailQueue.add({ user_id: user._id, mail_type: 'resendRegisterOtp', otp });

            return res.status(200).json({
                success: true,
                msg: "A registration OTP has been sent to your email address."
            });
        } else if (type === "passwordReset") {

            user.ForgetPasswordOtp = otp;
            await user.save();


            await EmailQueue.add({ user_id: user._id, mail_type: 'passwordResendOtp', otp });

            return res.status(200).json({
                success: true,
                msg: "A password reset OTP has been sent to your email address."
            });
        } else {

            return res.status(400).json({
                success: false,
                msg: "Invalid OTP type. Please specify either 'register' or 'passwordReset'."
            });
        }
    } catch (error) {
        console.error("Error during OTP resend:", error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while resending the OTP. Please try again later."
        });
    }
};
exports.LogginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body
        if (!Email || !Password) {
            return res.status(403).json({
                success: false,
                message: "Please enter all fields"
            })
        }
        const checkUser = await User.findOne({ Email })

        if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }

        const PasswordMatch = await checkUser.comparePassword(Password)
        if (!PasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            })
        }

        await sendToken(checkUser, res, 200, "Login success");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login Failed",
            error: error.message
        })
        console.log(error)
    }
}

exports.LogoutUser = async (req, res) => {

    try {
        res.cookie('Token')


        return res.status(200).json({
            success: true,
            message: 'Logged out'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

exports.GetMyDetails = async (req, res) => {
    try {
        const user = req.user.id._id
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Please Login To Access Your Account'
            })
        }

        const myDetails = await User.findById(userId).select('-password');

        if (!myDetails) {
            return res.status(404).json({
                success: false,
                message: 'Invalid User ,Please Contact Support Or Try To Re login'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'User details fetched successfully.',
            data: myDetails
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: 'Internal Server Error. Please try again later To Get Your Details.'
        });
    }
}

exports.PasswordChangeRequest = async (req, res) => {
    try {
        const { Email, newPassword } = req.body;


        if (!Email || !newPassword) {
            return res.status(400).json({
                success: false,
                msg: "Both email and new password are required."
            });
        }


        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "No user found with this email address."
            });
        }


        const otp = Math.floor(100000 + Math.random() * 900000);
        const expireTime = new Date().setMinutes(new Date().getMinutes() + 2);

        user.ForgetPasswordOtp = otp;
        user.ForgetPasswordExpired = expireTime;
        user.tempPassword = newPassword;


        await user.save();

        // Send OTP to user's email
        await EmailQueue.add({ user_id: user._id, mail_type: 'passwordOtp', otp });

        return res.status(200).json({
            success: true,
            msg: "An OTP has been sent to your email. Please check your inbox to proceed with password reset."
        });
    } catch (error) {
        console.error('Error in password change request:', error);


        return res.status(500).json({
            success: false,
            msg: "Internal Server Error. Please try again later."
        });
    }
};


