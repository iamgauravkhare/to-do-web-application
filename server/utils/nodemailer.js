const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorHandler");
exports.sendEmail = (req, res, next, resetPasswordToken) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.NODE_MAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: "Khare's Enterprises",
    to: req.body.email,
    subject: "Forget Password OTP",
    html: `<h1>OTP - ${resetPasswordToken}</h1>`,
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) return next(new ErrorHandler(err, 500));
    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  });
};
