const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const sendEmail = async (options) => {
   
  try {
  
    const transporter = nodemailer.createTransport({
      host: process.env.SMPT_HOST,
      port: process.env.SMPT_PORT,
      auth: {
        user:process.env.SMPT_MAIL,
        pass:process.env.SMPT_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      html: options.message, 
    };

    await transporter.sendMail(mailOptions);
    return true
  } catch (error) {
      console.error("Error sending email:", error);
      return false
  }
};

module.exports = sendEmail;